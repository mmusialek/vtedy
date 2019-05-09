export class ProjectDto {
  projectId: number;
  name: string;
  description: string;
  releaseAt: Date;

  static new(param: any) {
    return Object.assign(new ProjectDto(), param);
  }
}
