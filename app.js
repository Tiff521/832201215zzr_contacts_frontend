const API_URL = 'http://47.97.33.114:3000/api/contacts'; 

const contactsPerPage = 5; // 每页显示的联系人数量
let currentPage = 1;       // 当前页码
let contacts = [];         // 用于存储从服务器获取的联系人数据

// 加载所有联系人
async function loadContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        const contactsBody = document.getElementById('contactsBody');
        contactsBody.innerHTML = ''; // 清空现有内容
        contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button onclick="editContact(${contact.id})">编辑</button>
                    <button onclick="deleteContact(${contact.id})">删除</button>
                </td>
            `;
            contactsBody.appendChild(row);
        });
    } catch (error) {
        console.error("加载联系人失败:", error);
    }
}

// 添加或更新联系人
async function saveContact(event) {
    event.preventDefault(); // 防止表单的默认提交行为
    const contactId = document.getElementById('contactId').value; // 隐藏的 ID 字段
    const contactData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    // 检查 contactId 是否为空，如果为空则为新建联系人，否则为更新联系人
    const response = await fetch(`${API_URL}${contactId ? '/' + contactId : ''}`, {
        method: contactId ? 'PUT' : 'POST', // 更新用 PUT，新建用 POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
    });

    if (response.ok) {
        document.getElementById('contactForm').reset(); // 清空表单
        document.getElementById('contactId').value = ''; // 清空隐藏的 ID 字段
        loadContacts(); // 重新加载联系人列表
    } else {
        console.error("保存联系人失败:", response.statusText);
    }
}

// 删除联系人
async function deleteContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadContacts(); // 重新加载联系人列表
        } else {
            console.error("删除联系人失败:", response.statusText);
        }
    } catch (error) {
        console.error("删除联系人时出错:", error);
    }
}

// 编辑联系人信息
function editContact(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(contact => {
            // 将联系人信息填入表单中
            document.getElementById('contactId').value = contact.id;
            document.getElementById('name').value = contact.name;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('email').value = contact.email;
        })
        .catch(error => {
            console.error("获取联系人信息失败:", error);
        });
}

// 搜索联系人信息
function filterContacts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#contactsBody tr');
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const phone = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        // 检查姓名或电话中是否包含搜索关键字
        row.style.display = name.includes(query) || phone.includes(query) ? '' : 'none';
    });
}

// 提供导出CSV联系人列表
function exportContacts() {
    // 定义 CSV 文件的标题行
    let csvContent = "姓名,电话,邮箱\n";
    
    // 遍历当前页面中的联系人数据
    const rows = document.querySelectorAll('#contactsBody tr');
    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        const rowData = [
            columns[0].textContent, // 姓名
            columns[1].textContent, // 电话
            columns[2].textContent  // 邮箱
        ];
        csvContent += rowData.join(",") + "\n";
    });

    // 创建 CSV 文件的下载链接
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    
    // 模拟点击以下载文件
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 加载联系人并设置初始分页
async function loadContacts() {
    const response = await fetch(API_URL);
    contacts = await response.json();
    loadContactsPage(currentPage); // 加载第一页联系人
}

// 根据当前页码加载联系人
function loadContactsPage(page) {
    const start = (page - 1) * contactsPerPage;
    const end = start + contactsPerPage;
    const paginatedContacts = contacts.slice(start, end);

    const contactsBody = document.getElementById('contactsBody');
    contactsBody.innerHTML = ''; // 清空联系人列表
    paginatedContacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button onclick="editContact(${contact.id})">编辑</button>
                <button onclick="deleteContact(${contact.id})">删除</button>
            </td>
        `;
        contactsBody.appendChild(row);
    });

    // 更新页码指示器
    document.getElementById('pageIndicator').textContent = `第 ${page} 页`;
}

// 显示上一页
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadContactsPage(currentPage);
    }
}

// 显示下一页
function nextPage() {
    const totalPages = Math.ceil(contacts.length / contactsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        loadContactsPage(currentPage);
    }
}


// 添加表单提交事件监听器
document.getElementById('contactForm').addEventListener('submit', saveContact);

// 页面加载时获取联系人列表
loadContacts();
