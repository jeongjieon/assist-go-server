import { Router } from "express";
import UserService from "../services/User.service";

import Multer from "multer";

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 20mb, change as you need
  },
});

class UserController {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  //http://34.73.16.73:8080/users/sync
  private initializeRoutes() {
    // Test Routes
    // this.router.get(this.path + "/test/all", UserService);
    // this.router.get(this.path + "/test/one", UserService);

    // Sync OR Create User
    this.router.post(this.path + "/sync", UserService.actions.syncUserData);

    // User Info
    this.router.post(this.path + "/info", UserService.actions.getUserInfo);

    this.router.get(
      this.path + "/userExists/:user_id",
      UserService.actions.userExists,
    );

    this.router.get(
      this.path + "/hasSimCard/:user_id",
      UserService.actions.hasSimCard,
    );

    this.router.put(
      this.path + "/changeNumber",
      UserService.actions.changePhoneNumber,
    );

    this.router.put(
      this.path + "/info/:user_id",
      UserService.actions.changeUserInfo,
    );

    this.router.delete(
      this.path + "/delete",
      UserService.actions.deleteAccount,
    );

    // this.router.put(
    //   this.path + "/language",
    //   UserService.actions.changeLanguage,
    // );

    // Contacts
    this.router.delete(
      this.path + "/contact",
      UserService.actions.removeContact,
    );

    this.router.post(this.path + "/contact", UserService.actions.createContact);

    this.router.put(this.path + "/contact", UserService.actions.updateContact);

    this.router.get(
      this.path + "/contact/:user_id/:contact_id",
      UserService.actions.getContact,
    );

    this.router.get(
      this.path + "/contact/all/:user_id",
      UserService.actions.getAllContacts,
    );

    this.router.post(
      this.path + "/profile/upload/:user_id",
      multer.single("imgfile"),
      UserService.actions.uploadProfileImage,
    );

    this.router.post(
      this.path + "/call/add",
      UserService.actions.addToCallHistory,
    );

    this.router.get(
      this.path + "/call/history/:user_id",
      UserService.actions.getCallHistory,
    );

    this.router.post(
      this.path + "/call/history/remove",
      UserService.actions.removeFromCallHistory,
    );

    this.router.post(
      this.path + "/call/history/clear",
      UserService.actions.clearCallHistory,
    );

    // this.router.post(
    //   this.path + "/contact/qr",
    //   UserService.actions.createContactByQRCode,
    // );
  }
}

export default new UserController();
