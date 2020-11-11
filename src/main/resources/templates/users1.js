$(document).ready(function () {
    let url = "http://localhost:8080/getUsers";
    getUsers();
    // fetch(url)
    //     .then(response => response.json())
    //     .then(result => "")
    // ;
    //
    // // let response =  fetch(url);
    // // let json =  response.json();
    //
    //
    //
    // let promise = fetch(url);
    // // let response = await fetch(url);
    //
    // if (promise.ok) { // если HTTP-статус в диапазоне 200-299
    //     // получаем тело ответа (см. про этот метод ниже)
    //     let users = promise.json(); // читаем ответ в формате JSON
    //
    //     alert(users);
    // } else {
    //     alert("Ошибка HTTP: " + promise.status);
    // }
});

async function getUser() {
    /* ваш код */
    let url = "http://localhost:8080/getUser";
    let response = await fetch(url);

    let result = await response.json(); // читать тело ответа в формате JSON

    getLogout(result.currentUser, result.rolesCurrentUser);

    getVerticalPils(result.rolesCurrentUser);

    getAllUsersTable(result.userRoles);

    for (var user in result) {
        // alert(user);

    }
}
async function getUsers() {
    /* ваш код */
    let url = "http://localhost:8080/getUsers";
    let response = await fetch(url);

    let result = await response.json(); // читать тело ответа в формате JSON

    getLogout(result.currentUser, result.rolesCurrentUser);


    getVerticalPils(result.rolesCurrentUser);

    getAllUsersTable(result.userRoles);

    for (var user in result) {
        // alert(user);

    }
}

async function editModal() {
    let label_edit = document.getElementById('label_edit');
    let name_edit = document.getElementById('name_edit');
    let email_edit = document.getElementById('email_edit');
    let password_edit = document.getElementById('password_edit');
    let roles_edit = document.getElementById('roles_edit');

    let url = "http://localhost:8080/editNew";

    let response = await fetch(url + '?' + new URLSearchParams({
        id_edit: label_edit.value,
        name_edit: name_edit.value,
        email_edit: email_edit.value,
        password_edit: password_edit.value,
        roles_edit: roles_edit.value
    }));
    let result = await response.json();
    console.log("result=");
    console.log(result);
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

    // for (var user in result.rolesUser) {
    //     alert(user);
    //
    // }
    console.log(result.rolesUser);
    if (result.rolesUser != null) {
        // alert(result.rolesUser);
        // for (let i = 0; i < result.rolesUser.length; i++) {
        let roles = Object.entries(result.rolesUser);
        console.log(roles);
        for (let [key, value] of Object.entries(result.rolesUser)) {
            // alert(`${key}:${value}`);
            if (value === true) {
                // alert(`${key}:${value}`);
                innerHTML += '<label class="checkbox"><input type="checkbox" id="roles_edit" name="roles_edit" value=' + key + ' checked>';
            } else {
                innerHTML += '<label class="checkbox"><input type="checkbox" id="roles_edit" name="roles_edit" value=' + key + '>';
            }

            innerHTML += '<span>' + key + '</span></label>';
        }

        let roles_edit_div = document.getElementById('roles_edit_div');
        roles_edit_div.innerHTML = innerHTML;
        // <th:block class="btn-block form-control"
        //           th:each="role : ${userRole.rolesUser}">
        //     <label class="checkbox"><input type="checkbox"
        //                                    th:value="${role.key}"
        //                                    th:checked="${role.value}"
        //                                    name="roles_edit">
        //         <th:block><span th:text="${role.key}"></span>
        //         </th:block>
        //     </label>
        // </th:block>
    }
}

async function fillDeleteModal(id) {
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
        // $('<div></div>', {
        //     tabIndex: rolesCurrentUser[i].name,
        //     class: 'user',
        //     text: rolesCurrentUser[i].name,
        //     id: rolesCurrentUser[i].name
        // })
        // .appendTo('#' + i);
        innerHTML += "&nbsp;<span>" + rolesCurrentUser[i].name + "</span>&nbsp;";
    }
    document.getElementById('userRolesLogout').innerHTML = innerHTML;
}

function getVerticalPils(rolesCurrentUser) {
    let innerHTML = "";
    for (let i = 0; i < rolesCurrentUser.length; i++) {
        if (i === 0) {
            innerHTML += "<a class='nav-link active' id='v-pills-'" +
                rolesCurrentUser[i].name + "-tab' data-toggle='pill' href='#v-pills-'" +
                rolesCurrentUser[i].name + "' aria-selected='true' aria-controls='v-pills-'" +
                rolesCurrentUser[i].name + "' role='tab' value='" + rolesCurrentUser[i].name + "'>";
            innerHTML += "<span>" + rolesCurrentUser[i].name + "</span></a>";
        } else {
            innerHTML += "<a class='nav-link' id='v-pills-'" +
                rolesCurrentUser[i].name + "-tab' data-toggle='pill' href='#v-pills-'" +
                rolesCurrentUser[i].name + "' aria-selected='false' aria-controls='v-pills-'" +
                rolesCurrentUser[i].name + "' role='tab' value='" + rolesCurrentUser[i].name + "'>";
            innerHTML += "<span>" + rolesCurrentUser[i].name + "</span></a>";
        }
    }
    document.getElementById('pilsList').innerHTML = innerHTML;
}