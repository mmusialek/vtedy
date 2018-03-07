export class OptionPanelViewModel {
  items: OptionPanelItemViewModel[] = [];
}

export class OptionPanelItemViewModel {
  name: string;
  url: string;
  params: string[];
  action: () => void;


  constructor(params: { name?: string, url?: string, action?: () => void, params?: string[] } = {}) {
    this.name = params.name;
    this.url = params.url;
    this.action = params.action;
    this.params = params.params;
  }
}
