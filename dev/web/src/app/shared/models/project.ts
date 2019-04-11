export class Project {
    id: number;
    name: string;
    description: string;

    isDefault: boolean;

    static new(params?: any) {
        return Object.assign(new Project(), params);
    }
}
