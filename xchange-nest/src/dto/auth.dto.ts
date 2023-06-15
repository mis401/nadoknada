import { IsNotEmpty, IsStrongPassword, isNotEmpty } from "class-validator";

export class UserAuthSignInDto
{
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  //IsStrongPassword()
  password: string;
  hash:string;
  token: string
  @IsNotEmpty()
  ime : string;
  @IsNotEmpty()
  prezime:string;
  @IsNotEmpty()
  grad:string;
  @IsNotEmpty()
  datum_rodjenja:Date;
  //@IsNotEmpty()
  datum_registracije:Date;
  @IsNotEmpty()
  broj_telefona:string;
  @IsNotEmpty()
  email:string;
};


export class UserIzmenaDto
{
  @IsNotEmpty()
  username: string;
  //IsStrongPassword()
  @IsNotEmpty()
  password: string;
  hash:string;
  token: string
  @IsNotEmpty()
  ime : string;
  @IsNotEmpty()
  prezime:string;
  @IsNotEmpty()
  grad:string;
  @IsNotEmpty()
  datum_rodjenja:Date;
  //@IsNotEmpty()
  datum_registracije:Date;
  @IsNotEmpty()
  broj_telefona:string;
  @IsNotEmpty()
  email:string;
};


export class UserAuthLogin
{
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  //IsStrongPassword()
  password: string;
  hash: string;
}

  export class TokenDto {
    sub: string;
    username: string;
    role: string;
  }