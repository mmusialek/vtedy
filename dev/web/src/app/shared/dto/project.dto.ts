export class ProjectDto {
  id: number;
  name: string;
  description: string;
  releaseAt: Date;

  static new(param: any) {
    return Object.assign(new ProjectDto(), param);
  }
}
