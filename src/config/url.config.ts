class PAGES {
  private root = '/'
  private admin = '/admin'

  //*root*
  HOME = this.root
  NEWS = `${this.root}news`
  GALLERY = `${this.root}gallery`
  DOCUMENTS = `${this.root}documents`
  ABOUT = `${this.root}about`
  AUTH = `${this.root}auth`
  PROFILE = `${this.root}profile`
  CHANGE_PASSWORD = `${this.root}change-password`
  REQUEST_EMAIL = `${this.root}request-email`
  RESET_PASSWORD = `${this.root}reset-password`

  //events
  EVENTS = `${this.root}events`
  MY_EVENTS = `${this.root}my-events`
  //*root*

  //*admin*
  ADMIN = `${this.admin}`

  //users
  MANAGE_USERS = `${this.admin}/users`
  CREATE_USER = `${this.MANAGE_USERS}/create`
  EDIT_USER = `${this.MANAGE_USERS}/edit`

  //events
  MANAGE_EVENTS = `${this.admin}/events`
  CREATE_EVENT = `${this.MANAGE_EVENTS}/create`
  EDIT_EVENT = `${this.MANAGE_EVENTS}/edit`

  //news
  MANAGE_NEWS = `${this.admin}/news`
  CREATE_NEWS = `${this.MANAGE_NEWS}/create`
  EDIT_NEWS = `${this.MANAGE_NEWS}/edit`

  //applications
  MANAGE_APPLICATIONS = `${this.admin}/applications`

  //categories
  MANAGE_CATEGORY = `${this.admin}/category`

  //download app
  DOWNLOAD = `${this.admin}/download`
  //*admin*
}

export const URL_PAGES = new PAGES()
