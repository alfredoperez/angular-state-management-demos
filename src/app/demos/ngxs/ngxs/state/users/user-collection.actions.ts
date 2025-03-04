const ACTION_SCOPE = '[Users Collection]';

export namespace UserCollectionActions {
  export class FetchPage {
    static readonly type = `${ACTION_SCOPE} Fetch Page`;
  }

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
}
