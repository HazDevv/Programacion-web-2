export interface Actividad {
  id: number;     
  nombre: string;   
  materia: string;  
  fecha: string;    
  prioridad: 'Alta' | 'Media' | 'Baja'; 
  completada: boolean; 
}
//AQUI SE DICE QUE FORMA TINEN LOS DATOS ES DECIR ES EL
//MOLDE DE LA ACTIVIDAD