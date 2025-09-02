import * as qaEnv from "./env.qa";
import * as developEnv from "./env.develop";

export class Enviroment {
  private readonly env: any;

  // * Definimos el constructor que recibirá el ambiente a ejecutar
  // * según el argumento recibido, se asignará el ambiente y los datos correspondientes
  // * a la variable env
  constructor(tenant: string) {
    const environment = process.env.NODE_ENV;
    switch (environment) {
      case "qa":
        this.env = qaEnv.QA[tenant];
        break;
      case "develop":
        this.env = developEnv.DEVELOP[tenant];
        break;
      default:
        throw new Error('Ambiente inválido');
      }
  }

  // * Debemos declarar los métodos get para cada una de las variables
  // * que necesitemos utilizar en nuestros tests
  // *
  // * No es necesario declarar el ambiente de ese dato, ya que se asignó
  // * cuando definimos el constructor

  public get baseURL(): string {
    return this.env.baseURL;
  }

  public get username(): string {
    return this.env.username;
  }

  public get password(): string {
    return this.env.password;
  }


  
}
