export const generarHorarioAtencionVacio = () => {
   const dias = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
   ];

   const horarioVacio = {
      manana: { inicio: '', fin: '' },
      tarde: { inicio: '', fin: '' },
   };

   const horarioAtencion: Record<string, typeof horarioVacio> = {};

   dias.forEach((dia) => {
      horarioAtencion[dia] = { ...horarioVacio };
   });

   return horarioAtencion;
};
