export enum TypeComponent {
    StartFlow = "startFlow",
    SubFlow = "subFlow",
    EndFlow = "endFlow",
    GoToFlow = "goToFlow",
    GoToStep = "goToStep",
    Request = "request",
    Response = "response",
    Mapper = "mapper",
    Filter = "filter",
    CallApi = "callApi",
    File = "file",
    Decision = "decision",
    BackToParent = "backToParent",
    Anotation = "anotation",
    SendMessage = "sendMessage"
}

export const icon = new Map<TypeComponent, string>([
    [TypeComponent.StartFlow, '	fa fa-home'],
    [TypeComponent.SubFlow, 'fa fa-play'],
    [TypeComponent.EndFlow, 'fa fa-circle'],
    [TypeComponent.GoToStep, 'fa fa-flag'],
    [TypeComponent.GoToFlow, 'fa fa-mail-forward'],
    [TypeComponent.Request, 'fa fa-envelope'],
    [TypeComponent.Response, 'fa fa-envelope-open'],
    [TypeComponent.Mapper, 'fas fa-code'],
    [TypeComponent.Filter, 'fa fa-filter'],
    [TypeComponent.CallApi, 'fa fa-globe'],
    [TypeComponent.File, 'fa fa-file'],
    [TypeComponent.Decision, 'fa fa-code-fork'],
    [TypeComponent.BackToParent, 'fa fa-reply'],
    [TypeComponent.Anotation, 'fa fa-comment'],
    [TypeComponent.SendMessage, 'fa fa-paper-plane']
  ]);
  