import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Dashboard', path: '/contact/contacts', icon: 'home', type: 'link'
		},
		{
			title: 'Colleagues', path: '/contact/contacts', icon: 'home', type: 'link'
		},
		{
			title: 'Team Member', path: '/contact/contacts', icon: 'home', type: 'link'
		},
		{
			title: 'Applications', path: '/contact/contacts', icon: 'home', type: 'link'
		},
		{
			title: 'Reports', path: '/contact/contacts', icon: 'home', type: 'link'
		},

	]
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
