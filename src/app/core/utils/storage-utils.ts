//Funciones para sessionStorage
import {isPlatformBrowser} from "@angular/common";
import {inject, PLATFORM_ID} from "@angular/core";

export function getSessionItem(key: string): string | null {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function setSessionItem(key: string, value: string): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    sessionStorage.setItem(key, value);
  }
}

export function removeSessionItem(key: string): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    sessionStorage.removeItem(key);
  }
}

export function clearSessionItems(): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    sessionStorage.clear();
  }
}

//Funciones para localStorage
export function getLocalItem(key: string): string | null {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    return localStorage.getItem(key);
  }
  return null;
}

export function setLocalItem(key: string, value: string): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    localStorage.setItem(key, value);
  }
}

export function removeLocalItem(key: string): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    localStorage.removeItem(key);
  }
}

export function clearLocalItems(): void {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    localStorage.clear();
  }
}
