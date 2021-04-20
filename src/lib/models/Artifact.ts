export class Artifact {
  groupId: string;
  artifactId: string;
  version: string;

  constructor(groupId: string, artifactId: string, version: string) {
    this.groupId = groupId;
    this.artifactId = artifactId;
    this.version = version;
  }
}
