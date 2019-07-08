import {ProjectDto} from './project.dto';
import {TagDto} from './tag.dto';

export class TodoItemDto {
  id: string;
  name: string;
  project: ProjectDto;
  projectId: number;
  isCurrent: boolean;

  tags: TagDto[] = [];
}
