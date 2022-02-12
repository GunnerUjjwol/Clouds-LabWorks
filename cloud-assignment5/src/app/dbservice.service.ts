import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbserviceService {
  wishListRef: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.wishListRef = this.firestore.collection('wishlist');
  }

  getMovieListData() {
    const ref = this.db.list('movies-list');
  }

  getWishList(userId: string) {
    return this.wishListRef.doc(userId).valueChanges();
  }

  updateWishList(userId: string, data: any): Promise<void> {
    return this.wishListRef.doc(userId).update(data);
  }

  setWishlist(userId: string, data: any) {
    return this.wishListRef.doc(userId).set({ ...data });
  }

  updateWishlist(userId: string, wishlist: any) {
    return this.wishListRef.doc(userId).update(wishlist);
  }
}
