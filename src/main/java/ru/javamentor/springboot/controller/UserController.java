package ru.javamentor.springboot.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import ru.javamentor.springboot.dto.AddUserErrorDto;
import ru.javamentor.springboot.dto.DeleteUserErrorDto;
import ru.javamentor.springboot.dto.UserRole;
import ru.javamentor.springboot.dto.UserRoleErrorDto;
import ru.javamentor.springboot.entity.UsersPageList;
import ru.javamentor.springboot.exception.DBException;
import ru.javamentor.springboot.model.Role;
import ru.javamentor.springboot.model.User;
import ru.javamentor.springboot.service.UserService;

import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @PreAuthorize("hasAnyAuthority('USER')")
//    @GetMapping(value = "user")
//    @ResponseBody
//    public ModelAndView printCurrentUser() {
//        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        HttpSession session = attr.getRequest().getSession();
//        String username = (String) session.getAttribute("username");
//        String password = (String) session.getAttribute("password");
//        User currentUser = userService.getUserByNameAndPassword(username, password);
//        List<Role> roles = userService.getRolesByUser(currentUser);
//        List<Role> rolesCurrentUser = userService.getRolesByUser(currentUser);
//        ModelAndView result = new ModelAndView("user");
//        result.addObject("roles", roles);
//        result.addObject("currentUser", currentUser);
//        result.addObject("rolesCurrentUser", rolesCurrentUser);
//        return result;
//    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping(value = "getUser")
    @ResponseBody
    public UsersPageList printCurrentUser() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession();
        String username = (String) session.getAttribute("username");
        String password = (String) session.getAttribute("password");
        UsersPageList usersPageList = new UsersPageList();

//        User currentUser = userService.getUserByNameAndPassword(username, password);
//        List<Role> roles = userService.getRolesByUser(currentUser);
//        List<Role> rolesCurrentUser = userService.getRolesByUser(currentUser);
        List<String> roles = userService.getAllRoles();
        usersPageList.setRoles(roles);

        User currentUser = userService.getUserByNameAndPassword(username, password);
        usersPageList.setCurrentUser(currentUser);

        List<Role> rolesCurrentUser = userService.getRolesByUser(currentUser);
        usersPageList.setRolesCurrentUser(rolesCurrentUser);

        UserRole userRole= new UserRole();
        userRole.setUser(currentUser);
        userRole.setRoles(rolesCurrentUser);

//        List<UserRole> userRoles = userService.getAllUsersAndRoles();
        List<UserRole> userRoles = Collections.singletonList(userRole);
        usersPageList.setUserRoles(userRoles);

        return usersPageList;
    }

//    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
//    @GetMapping(value = "users")
//    @ResponseBody
//    public ModelAndView printUsersOld(Model model) {
//        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        HttpSession session = attr.getRequest().getSession();
//        String username = (String) session.getAttribute("username");
//        String password = (String) session.getAttribute("password");
//        User currentUser = userService.getUserByNameAndPassword(username, password);
//        List<Role> rolesCurrentUser = userService.getRolesByUser(currentUser);
//
//        List<UserRole> userRoles = userService.getAllUsersAndRoles();
//
//
//        ModelAndView modelAndView = new ModelAndView();
//        List<String> roles = userService.getAllRoles();
//        modelAndView.setViewName("users");
//        modelAndView.addObject("userRoles", userRoles);
//        modelAndView.addObject("roles", roles);
//        modelAndView.addObject("rolesCurrentUser", rolesCurrentUser);
//        modelAndView.addObject("currentUser", currentUser);
//
//        return modelAndView;
//    }

    @PreAuthorize("hasAnyAuthority( 'USER')")
    @GetMapping(value = "user")
    public String printUserNew() {
        return "user";
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(value = "users")
    public String printUsersNew() {
        return "users";
    }


    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(value = "getUsers")
    @ResponseBody
    public UsersPageList getUsersNew() {

        UsersPageList usersPageList = new UsersPageList();

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession();
        String username = (String) session.getAttribute("username");
        String password = (String) session.getAttribute("password");

        User currentUser = userService.getUserByNameAndPassword(username, password);
        usersPageList.setCurrentUser(currentUser);

        List<Role> rolesCurrentUser = userService.getRolesByUser(currentUser);
        usersPageList.setRolesCurrentUser(rolesCurrentUser);

        List<UserRole> userRoles = userService.getAllUsersAndRoles();
        usersPageList.setUserRoles(userRoles);

        List<String> roles = userService.getAllRoles();
        usersPageList.setRoles(roles);

        return usersPageList;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(value = "getUserRoleByUserId")
    @ResponseBody
    public UserRole getUserRoleByUserId(@RequestParam String id) {
        UserRole userRole = getUserRole(id);

        return userRole;
    }

    private UserRole getUserRole(String id) {
        UserRole userRole = new UserRole();

        User currentUser = userService.getUserById(Long.valueOf(id));
        userRole.setUser(currentUser);

        Map<String, Boolean> roleCheckedByUser = userService.getRoleCheckedByUser(currentUser);
        userRole.setRolesUser(roleCheckedByUser);

        List<Role> roles = userService.getRolesByUser(currentUser);
        userRole.setRoles(roles);
        return userRole;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping(value = "/delete")
    @ResponseBody
    public RedirectView deleteUser(@RequestParam String id_delete) {
        RedirectView redirectView = new RedirectView("users");
        try {
            userService.deleteUser(Long.valueOf(id_delete));

        } catch (DBException e) {
            System.out.println(e.getLocalizedMessage());
        }
        return redirectView;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping(value = "/deleteNew")
    @ResponseBody
    public DeleteUserErrorDto deleteUserNew(@RequestParam String id_delete) {
        DeleteUserErrorDto deleteUserErrorDto = new DeleteUserErrorDto();
        try {
            deleteUserErrorDto.setSuccess(userService.deleteUser(Long.valueOf(id_delete)));
            return deleteUserErrorDto;
        } catch (DBException e) {
            deleteUserErrorDto.setError(e.getLocalizedMessage());
        }
        return deleteUserErrorDto;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping(value = "/edit")
    @ResponseBody
    public RedirectView editUser(@RequestParam String id_edit, String name_edit, String password_edit, String email_edit, String[] roles_edit) {
        ModelAndView result = new ModelAndView("users");
        try {
            userService.editUser(Long.valueOf(id_edit), name_edit, email_edit, password_edit, roles_edit);
        } catch (DBException e) {
            result.addObject("error", e.getLocalizedMessage());
        }
        return new RedirectView("users");
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping(value = "/editNew")
    @ResponseBody
    public UserRoleErrorDto editNewUser(@RequestParam String id_edit, String name_edit, String password_edit, String email_edit, String[] roles_edit) {
        UserRoleErrorDto userRoleErrorDto = new UserRoleErrorDto();
        try {
            userService.editUser(Long.valueOf(id_edit), name_edit, email_edit, password_edit, roles_edit);
            userRoleErrorDto.setUserRole(getUserRole(id_edit));
            return userRoleErrorDto;
        } catch (DBException e) {
            userRoleErrorDto.setError(e.getLocalizedMessage());
        }
        return userRoleErrorDto;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping(value = "/addNew")
    @ResponseBody
    public AddUserErrorDto addUserNew(@RequestParam String name, String password, String email, String[] roles) {
        AddUserErrorDto userRoleErrorDto = new AddUserErrorDto(false, "");
        try {
            User user = new User(name, password, email);
            userRoleErrorDto.setSuccess( userService.addRolesUser(user, roles));
        } catch (Exception e) {
            userRoleErrorDto.setError(e.getLocalizedMessage());
        }
        return userRoleErrorDto;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping(value = "/add")
    @ResponseBody
    public RedirectView addUser(@RequestParam String name, String password, String email, String[] roles) {
        ModelAndView result = new ModelAndView("users");
        try {
            User user = new User(name, password, email);
            userService.addRolesUser(user, roles);
        } catch (Exception e) {
            result.addObject("error", e.getLocalizedMessage());
        }
        List<User> users = userService.getAllUsers();

        result.addObject("users", users);
        return new RedirectView("users");
    }

    @GetMapping(value = "login")
    public String loginPage() {
        return "login";
    }
}