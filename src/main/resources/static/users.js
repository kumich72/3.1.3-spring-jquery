$(document).ready(function () {
    getUsers();
});


function setUserInfo(currentUser, rolesCurrentUser) {
    document.getElementById('id_info').value = currentUser.id;
    document.getElementById('name_info').value = currentUser.name;
    document.getElementById('password_info').value = currentUser.password;
    document.getElementById('email_info').value = currentUser.email;

    let innerHTML = "";

    for (let i = 0; i < rolesCurrentUser.length; i++) {
        innerHTML += "&nbsp;<span>" + rolesCurrentUser[i].name + "</span>&nbsp;";
    }
    document.getElementById('roles_info').innerHTML = innerHTML;
}

$('#v-pills-tab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

async function getUsers() {
    /* ваш код */
    let url = "http://localhost:8080/getUsers";
    let response = await fetch(url);

    let result = await response.json(); // читать тело ответа в формате JSON

    getLogout(result.currentUser, result.rolesCurrentUser);


    getVerticalPils(result.rolesCurrentUser);

    getAllUsersTable(result.userRoles);

    setAddRoles(result.roles);

    setUserInfo(result.currentUser, result.rolesCurrentUser);
}

function setAddRoles(roles) {
    let innerHTML = "";
    let roles_add_div = document.getElementById('roles_add_div');
    for (let i = 0; roles[i]; ++i) {
        // alert(roles[i]);
        innerHTML += '<input class="rolesAddCheckbox" type="checkbox" name="roles_add" id="roles_add_' + i + '" value="' + roles[i] + '">';
        innerHTML += '<label class="form-check-label" for="roles_add_' + i + '">' + roles[i] + '</label>';
    }
    roles_add_div.innerHTML = innerHTML;
}


async function addNewUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let checkedValue = null;
    let roles = [];
    let inputElements = document.getElementsByClassName('rolesAddCheckbox');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue = inputElements[i].value;
            roles.push(checkedValue);
            console.log(checkedValue);
        }
    }

    let url = "http://localhost:8080/addNew";

    let response = await fetch(url + '?' + new URLSearchParams({
        name: name.value,
        email: email.value,
        password: password.value,
        roles: roles
    }));
    let result = await response.json();
    console.log("result=");
    console.log(result);

    // $('#editModal').modal("hide");
    name.value = "";
    email.value = "";
    password.value = "";
    $('#home-tab').tab('show')
    getUsers();
}

async function editModal() {
    let label_edit = document.getElementById('label_edit');
    let name_edit = document.getElementById('name_edit');
    let email_edit = document.getElementById('email_edit');
    let password_edit = document.getElementById('password_edit');

    let checkedValue = null;
    let roles = [];
    let inputElements = document.getElementsByClassName('rolesCheckbox');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue = inputElements[i].value;
            roles.push(checkedValue);
            console.log(checkedValue);
        }
    }

    let url = "http://localhost:8080/editNew";

    let response = await fetch(url + '?' + new URLSearchParams({
        id_edit: label_edit.value,
        name_edit: name_edit.value,
        email_edit: email_edit.value,
        password_edit: password_edit.value,
        roles_edit: roles
    }));
    let result = await response.json();
    console.log("result=");
    console.log(result);

    $('#editModal').modal("hide");
    getUsers();
}

async function deleteModal() {
    let label_delete = document.getElementById('label_delete');

    let url = "http://localhost:8080/deleteNew";

    let response = await fetch(url + '?' + new URLSearchParams({
        id_delete: label_delete.value
    }));
    let result = await response.json();
    console.log("result=");
    console.log(result);

    $('#deleteModal').modal("hide");
    getUsers();
}

async function fillEditModal(id) {
    let innerHTML = "";
    let label_edit = document.getElementById('label_edit');
    label_edit.value = id;
    let url = "http://localhost:8080/getUserRoleByUserId";
    let response = await fetch(url + '?' + new URLSearchParams({
        id: id
    }));
    let result = await response.json();
    if (result.user != null) {
        let name_edit = document.getElementById('name_edit');
        name_edit.value = result.user.name;
        let email_edit = document.getElementById('email_edit');
        email_edit.value = result.user.email;
        let password_edit = document.getElementById('password_edit');
        password_edit.value = result.user.password;
    }

    console.log(result.rolesUser);
    if (result.rolesUser != null) {
        let roles = Object.entries(result.rolesUser);
        console.log(roles);
        let count = 1;
        for (let [key, value] of Object.entries(result.rolesUser)) {
            innerHTML += '<div class="form-check form-check-inline">';
            if (value === true) {
                // alert(`${key}:${value}`);
                innerHTML += '<input class="rolesCheckbox" type="checkbox" name="roles_edit" id="roles_edit_' + count + '" value="' + key + '" checked>';
            } else {
                innerHTML += '<input class="rolesCheckbox" type="checkbox" name="roles_edit" id="roles_edit_' + count + '" value="' + key + '">';
            }
            innerHTML += '<label class="form-check-label" for="roles_edit_' + count + '">' + key + '</label>';
            count++;
            innerHTML += '</div>'
        }
        let roles_edit_div = document.getElementById('roles_edit_div');
        roles_edit_div.innerHTML = innerHTML;
    }
}

async function fillDeleteModal(id) {
    let innerHTML = "";
    let label_delete = document.getElementById('label_delete');
    label_delete.value = id;
    let url = "http://localhost:8080/getUserRoleByUserId"
    let response = await fetch(url + '?' + new URLSearchParams({
        id: id
    }));
    let result = await response.json();
    if (result.user != null) {
        let name_delete = document.getElementById('name_delete');
        name_delete.value = result.user.name;
        let email_delete = document.getElementById('email_delete');
        email_delete.value = result.user.email;
        let password_delete = document.getElementById('password_delete');
        password_delete.value = result.user.password;
        let id_delete = document.getElementById('id_delete');
        id_delete.value = result.user.id;
    }

    if (result.rolesUser != null) {
        let roles = Object.entries(result.rolesUser);
        console.log(roles);
        for (let [key, value] of Object.entries(result.rolesUser)) {
            if (value === true) {
                innerHTML += '<label class="checkbox"><input type="checkbox" disabled id="roles_delete" name="roles_delete" value=' + key + ' checked>';
            } else {
                innerHTML += '<label class="checkbox"><input type="checkbox" disabled id="roles_delete" name="roles_delete" value=' + key + '>';
            }
            innerHTML += '<span>' + key + '</span></label>';
        }
        let roles_edit_div = document.getElementById('roles_delete_div');
        roles_edit_div.innerHTML = innerHTML;
    }
}

function getAllUsersTable(userRoles) {
    let innerHTML = "<label class=\"font-weight-bold\">All user</label>";

    innerHTML += '<table class="table table-striped bg-white border-right border-bottom">';
    innerHTML += '<tr>';
    innerHTML += '        <th>Id</th>';
    innerHTML += '        <th>Name</th>';
    innerHTML += '        <th>Email</th>';
    innerHTML += '        <th>Role</th>';
    innerHTML += '        <th>Edit</th>';
    innerHTML += '        <th>Delete</th>';
    innerHTML += '</tr>';

    for (let i = 0; i < userRoles.length; i++) {
        innerHTML += '<tr>';
        innerHTML += '<td>' + userRoles[i].user.id + '</td>';
        innerHTML += '<td>' + userRoles[i].user.name + '</td>';
        innerHTML += '<td>' + userRoles[i].user.email + '</td>';
        innerHTML += '        <td>';
        for (let j = 0; j < userRoles[i].roles.length; j++) {
            innerHTML += '                <label>' + userRoles[i].roles[j].name + '</label>';
        }
        innerHTML += '        </td>';

        innerHTML += '<td>';
        innerHTML += '<button type="button" class="btn btn-info" data-toggle="modal" onClick="fillEditModal(' + userRoles[i].user.id + ')" data-target="#editModal">Edit</button>';
        innerHTML += '</td>';
        innerHTML += '<td>';
        innerHTML += '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onClick="fillDeleteModal(' + userRoles[i].user.id + ')">Delete</button>';
        innerHTML += '</td>';
        innerHTML += '</tr>';
    }
    innerHTML += '</table>';
    document.getElementById('tableAllUser').innerHTML = innerHTML;
}

function getLogout(currentUser, rolesCurrentUser) {
    document.getElementById('userNameLogout').innerHTML = currentUser.name;

    let innerHTML = "<span> with roles :</span>";

    for (let i = 0; i < rolesCurrentUser.length; i++) {
        innerHTML += "&nbsp;<span>" + rolesCurrentUser[i].name + "</span>&nbsp;";
    }
    document.getElementById('userRolesLogout').innerHTML = innerHTML;
}

function getVerticalPils(rolesCurrentUser) {
    let innerHTML = "";
    for (let i = 0; i < rolesCurrentUser.length; i++) {
        if (i === 0) {
            innerHTML += "<a class='nav-link active show' id='v-pills-" +
                rolesCurrentUser[i].name + "-tab' data-toggle='pill' href='#v-pills-" +
                rolesCurrentUser[i].name + "' aria-selected='true' aria-controls='v-pills-" +
                rolesCurrentUser[i].name + "' role='tab' value='" + rolesCurrentUser[i].name + "'>";
            innerHTML += "<span>" + rolesCurrentUser[i].name + "</span></a>";
        } else {
            innerHTML += "<a class='nav-link' id='v-pills-" +
                rolesCurrentUser[i].name + "-tab' data-toggle='pill' href='#v-pills-" +
                rolesCurrentUser[i].name + "' aria-selected='false' aria-controls='v-pills-" +
                rolesCurrentUser[i].name + "' role='tab' value='" + rolesCurrentUser[i].name + "'>";
            innerHTML += "<span>" + rolesCurrentUser[i].name + "</span></a>";
        }
    }
    document.getElementById('v-pills-tab').innerHTML = innerHTML;
}