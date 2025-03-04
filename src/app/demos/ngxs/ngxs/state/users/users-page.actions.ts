const ACTION_SCOPE = '[Users Page]';

export namespace UsersPageActions {
  export class SetPage {
    static readonly type = `${ACTION_SCOPE} Set Page`;
    constructor(public readonly page: number) {}
  }

  export class SetPageSize {
    static readonly type = `${ACTION_SCOPE} Set Page Size`;
    constructor(public readonly pageSize: number) {}
  }

  export class SetSearch {
    static readonly type = `${ACTION_SCOPE} Set Search`;
    constructor(
      public readonly search: string,
      public readonly page?: number,
    ) {}
  }

  export class FetchTeams {
    static readonly type = `${ACTION_SCOPE} Fetch Teams`;
  }

  export class FetchProjects {
    static readonly type = `${ACTION_SCOPE} Fetch Projects`;
  }

  export class FetchUsers {
    static readonly type = `${ACTION_SCOPE} Fetch Users`;
  }

  export class FetchAllData {
    static readonly type = `${ACTION_SCOPE} Fetch All Data`;
  }
}
