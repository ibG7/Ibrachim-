// تعريف البيانات
let items = []; // لتخزين الأصناف
let invoices = []; // لتخزين الفواتير

// دالة لتسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // تحقق من بيانات تسجيل الدخول
    if (username === "admin" && password === "admin123") {
        document.getElementById("loginPage").style.display = "none"; // إخفاء صفحة تسجيل الدخول
        document.getElementById("dashboardPage").style.display = "block"; // إظهار لوحة التحكم
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
}

// دالة لإضافة صنف جديد
function addItem() {
    const name = prompt("أدخل اسم الصنف");
    const type = prompt("أدخل نوع الصنف");
    const code = prompt("أدخل رقم الصنف");
    const price = prompt("أدخل السعر");
    const productionDate = prompt("أدخل تاريخ الإنتاج");
    const expiryDate = prompt("أدخل تاريخ الانتهاء");

    const newItem = {
        name,
        type,
        code,
        price,
        productionDate,
        expiryDate
    };

    items.push(newItem);
    displayItems();
}

// دالة لإضافة فاتورة جديدة
function addInvoice() {
    const itemName = prompt("أدخل اسم الصنف");
    const itemCode = prompt("أدخل رقم الصنف");
    const price = prompt("أدخل السعر");
    const quantity = prompt("أدخل العدد الإجمالي");
    const date = prompt("أدخل التاريخ");

    const newInvoice = {
        itemName,
        itemCode,
        price,
        quantity,
        date
    };

    invoices.push(newInvoice);
    displayInvoices();
}

// دالة لعرض الأصناف
function displayItems() {
    const tableBody = document.querySelector("#itemsTable tbody");
    tableBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td><input type="checkbox" class="itemCheckbox" data-index="${index}"></td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.code}</td>
            <td>${item.price}</td>
            <td>${item.productionDate}</td>
            <td>${item.expiryDate}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// دالة لعرض الفواتير
function displayInvoices() {
    const tableBody = document.querySelector("#invoicesTable tbody");
    tableBody.innerHTML = '';

    invoices.forEach((invoice, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="checkbox" class="invoiceCheckbox" data-index="${index}"></td>
            <td>${invoice.itemName}</td>
            <td>${invoice.itemCode}</td>
            <td>${invoice.price}</td>
            <td>${invoice.quantity}</td>
            <td>${invoice.date}</td>
        `;

        tableBody.appendChild(row);
    });
}

// دالة لطباعة الأصناف
function printItems() {
    const selectedItems = document.querySelectorAll(".itemCheckbox:checked");
    let content = `
        <div style="text-align:center; font-size: 36px; color: red; font-weight: bold;">السنمي للأدوية</div>
        <div style="text-align:center; font-size: 20px; color: red;">دكتور برهان السنمي</div>
        <div style="text-align:center; font-size: 20px; color: red;">الرقم: 775356423</div>
        <div style="text-align:center; font-size: 20px; color: red;">التاريخ: ${new Date().toLocaleDateString()} - الوقت: ${new Date().toLocaleTimeString()}</div>
        <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>اسم الصنف</th>
                    <th>نوع الصنف</th>
                    <th>رقم الصنف</th>
                    <th>السعر</th>
                    <th>تاريخ الإنتاج</th>
                    <th>تاريخ الانتهاء</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    selectedItems.forEach(item => {
        const index = item.getAttribute("data-index");
        const selectedItem = items[index];
        
        content += `
            <tr>
                <td>${selectedItem.name}</td>
                <td>${selectedItem.type}</td>
                <td>${selectedItem.code}</td>
                <td>${selectedItem.price}</td>
                <td>${selectedItem.productionDate}</td>
                <td>${selectedItem.expiryDate}</td>
            </tr>
        `;
    });

    content += `
            </tbody>
        </table>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

// دالة لطباعة الفواتير
function printInvoices() {
    const selectedInvoices = document.querySelectorAll(".invoiceCheckbox:checked");
    let content = `
        <div style="text-align:center; font-size: 36px; color: red; font-weight: bold;">السنمي للأدوية</div>
        <div style="text-align:center; font-size: 20px; color: red;">دكتور برهان السنمي</div>
        <div style="text-align:center; font-size: 20px; color: red;">الرقم: 775356423</div>
        <div style="text-align:center; font-size: 20px; color: red;">التاريخ: ${new Date().toLocaleDateString()} - الوقت: ${new Date().toLocaleTimeString()}</div>
        <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>اسم الصنف</th>
                    <th>رقم الصنف</th>
                    <th>السعر</th>
                    <th>العدد الإجمالي</th>
                    <th>التاريخ</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    selectedInvoices.forEach(invoice => {
        const index = invoice.getAttribute("data-index");
        const selectedInvoice = invoices[index];
        
        content += `
            <tr>
                <td>${selectedInvoice.itemName}</td>
                <td>${selectedInvoice.itemCode}</td>
                <td>${selectedInvoice.price}</td>
                <td>${selectedInvoice.quantity}</td>
                <td>${selectedInvoice.date}</td>
            </tr>
        `;
    });

    content += `
            </tbody>
        </table>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}