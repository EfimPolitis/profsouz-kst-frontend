class DASHBOARD {
  private root = '/'
  private admin = '/admin'

  HOME = this.root
  NEWS = `${this.root}news`
  GALLERY = `${this.root}gallery`
  DOCUMENTS = `${this.root}documents`
  ABOUT = `${this.root}about`
  AUTH = `${this.root}auth`

  FEEDBACK = `${this.root}feedback`
  EVENTS = `${this.root}events`
  MY_EVENTS = `${this.root}my-events`

  ADMIN = `${this.admin}`
  MANAGE_USERS = `${this.admin}/users`
  MANAGE_RESERVATIONS = `${this.admin}/reservations`
  MANAGE_APPLICATIONS = `${this.admin}/applications`
  MANAGE_EVENTS = `${this.admin}/events`
  MANAGE_NEWS = `${this.admin}/news`
  REPORTS = `${this.admin}/feedback`
  CREATE_EVENT = `${this.MANAGE_EVENTS}/create`
  EDIT_EVENT = `${this.MANAGE_EVENTS}/edit`
  CREATE_USER = `${this.MANAGE_USERS}/create`
  EDIT_USER = `${this.MANAGE_USERS}/edit`
  MANAGE_CATEGORY = `${this.admin}/category`
}

export const DASHBOARD_PAGES = new DASHBOARD()
