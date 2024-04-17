import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
valor:any;
  constructor(private database:Database) {
    const route = ref(this.database, /*direccion a donde ir dentro de la base de datos */);
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      this.valor=100-valores_db.valor;
      console.log(this.valor);
      if(this.valor<=20){
        this.ngOnInit();
      }

    });
  }
  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "Peligro de incendio",
          body: "Revisa tu casa, puede estar quemandose",
          id: 1
        }
      ]
    });
  }
}
