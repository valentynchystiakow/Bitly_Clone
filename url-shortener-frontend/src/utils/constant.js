// imports components
import AppRouter, { SubDomainRouter } from '../AppRouter'

// creates and exports subDomainList
export const subDomainList = [{subdomain:"www", app: AppRouter, main: true},{subdomain: "url", app: SubDomainRouter, main: false}]