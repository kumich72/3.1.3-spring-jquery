$(document).ready(function () {
    // let url = "http://localhost:8080/getUser";
    getUser();
});

async function getUser() {
    /* ваш код */
    let url = "http://localhost:8080/getUser";
    let response = await fetch(url);

    let result = await response.json(); // читать тело ответа в формате JSON

    getLogout(result.currentUser, result.rolesCurrentUser);

    getVerticalPils(result.rolesCurrentUser);

    getAllUsersTable(result.userRoles);
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

function getAllUsersTable(userRoles) {
    let innerHTML = "<label class=\"font-weight-bold\">All user</label>";

    innerHTML += '<table class="table table-striped bg-white border-right border-bottom">';
    innerHTML += '<tr>';
    innerHTML += '        <th>Id</th>';
    innerHTML += '        <th>Name</th>';
    innerHTML += '        <th>Email</th>';
    innerHTML += '        <th>Role</th>';
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

        innerHTML += '</tr>';
    }
    innerHTML += '</table>';
    document.getElementById('tableAllUser').innerHTML = innerHTML;
}