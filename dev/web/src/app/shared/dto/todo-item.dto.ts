import {ProjectDto} from './project.dto';
import {TagDto} from './tag.dto';

export class TodoItemDto {
  id: string;
  name: string;
  project: ProjectDto;
  isCurrent: boolean;

  tags: TagDto[];
}
