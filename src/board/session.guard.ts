import { CanActivate, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { jwtConstants } from "src/auth/constants";
import { UsersService } from "src/users/users.service";
import { JwtStrategy } from "src/auth/jwt.strategy";


@Injectable()
export class WsGuard implements CanActivate {

  constructor(private userService: UsersService, private jwt: JwtStrategy) {
  }

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
    try { // @ts-ignore
      const decoded = this.jwt.verify(bearerToken, jwtConstants.secret) as any;
      return new Promise((resolve, reject) => {
        return this.userService.findOne(decoded.username).then(user => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });

      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
