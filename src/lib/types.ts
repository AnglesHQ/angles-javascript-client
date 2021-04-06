export class Team {
  _id: number;
  name: string;
  components: [{
    name: string;
    _id: string;
  }];
}

export class Environment {
  _id: number;
  name: string;
}
