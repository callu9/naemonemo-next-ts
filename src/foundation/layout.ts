export const spacing = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 56];

export const radius = [0, 4, 8, 12, 16];

export const layout = {
  flex: (obj: object | any) => `
      display: flex;
      flex-direction: ${obj?.direction ?? "row"};
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? 16}px;
      `,
  grid: (obj: object | any) => `
      display: grid;
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? 16}px;
    `,
};
