document.addEventListener('DOMContentLoaded', () => {
    // variable for customer data record
    let customers = localStorage.getItem("customers")
    // if no customer in localStorage create a blank array
    if (!customers) {
        localStorage.setItem("customers", [])
        customers = []
    } else {
        // else assign the customers data
        customers = JSON.parse(localStorage.getItem("customers"))
    }

    // elements references
    const customerTableBody = document.getElementById('customerTableBody');
    const customerModal = document.getElementById('customerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById("modalDescription")
    const customerForm = document.getElementById('customerForm');
    const closeModal = document.querySelector('.close');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const searchInput = document.getElementById('search');

    // function to render the table
    function renderTable(data) {
        customerTableBody.innerHTML = '';
        data.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.number}</td>
          <td>${customer.date}</td>
          <td>${customer.address}</td>
          <td class='actions'>
            <button onclick="editCustomer(${customer._id})">
              <img src="icons/edit.svg" alt="edit">
            </button>
            <button onclick="deleteCustomer(${customer._id})">
              <img src="icons/delete.svg" alt="delete">
            </button>
          </td>
        `;
            customerTableBody.appendChild(row);
        });
    }

    // open form 
    function openModal() {
        customerModal.style.display = 'block';
    }

    // close form
    function closeModalFunc() {
        customerModal.style.display = 'none';
    }

    // reset the form
    function resetForm() {
        customerForm.reset();
        document.getElementById('customerId').value = '';
    }

    // function to add a customer to localStorage
    function addCustomer(data) {
        if (customers.length > 0) {
            data._id = customers[customers.length - 1]._id + 1;
        } else {
            data._id = 0
        }
        customers.push(data);
        localStorage.setItem("customers", JSON.stringify(customers))
        renderTable(customers);
    }

    // function to update a customer data in localStorage
    function updateCustomer(data) {
        const index = customers.findIndex(customer => customer._id == data._id);
        customers[index] = data;
        localStorage.setItem("customers", JSON.stringify(customers))
        renderTable(customers);
    }

    // function to open edit form with customer data
    window.editCustomer = function (id) {
        const customer = customers.find(c => c._id == id);
        document.getElementById('customerId').value = customer._id;
        document.getElementById('name').value = customer.name;
        document.getElementById('email').value = customer.email;
        document.getElementById('phone').value = customer.number;
        document.getElementById('dob').value = customer.date;
        document.getElementById('address').value = customer.address;
        modalTitle.textContent = 'Edit Customer';
        modalDescription.textContent = "Update the customer details"
        modalSubmitBtn.textContent = 'Save';
        openModal();
    }

    // function to delete a customer
    window.deleteCustomer = function (id) {
        customers = customers.filter(customer => customer._id != id);
        localStorage.setItem("customers", JSON.stringify(customers))
        renderTable(customers);
    }

    // event listener to open add form
    addCustomerBtn.addEventListener('click', () => {
        resetForm();
        modalTitle.textContent = 'Add Customer';
        modalSubmitBtn.textContent = 'Add';
        openModal();
    });

    // event listener to close form
    closeModal.addEventListener('click', closeModalFunc);
    modalCancelBtn.addEventListener("click", closeModalFunc);

    // event listener to update and add customer data
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerData = {
            _id: document.getElementById('customerId').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            number: document.getElementById('phone').value,
            date: document.getElementById('dob').value,
            address: document.getElementById('address').value,
        };
        if (customerData._id) {
            updateCustomer(customerData);
        } else {
            addCustomer(customerData);
        }
        closeModalFunc();
    });

    // event listener to search customer
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCustomers = customers.filter(customer =>
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query)
        );
        renderTable(filteredCustomers);
    });

    renderTable(customers);
});
