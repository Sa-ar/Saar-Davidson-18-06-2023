export type Weather = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type Location = {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
};
