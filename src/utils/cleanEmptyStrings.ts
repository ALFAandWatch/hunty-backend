export const cleanEmptyStrings = (data: Record<string, any>) => {
   return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
         key,
         value === null || value === undefined ? '' : value,
      ])
   );
};
