import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products/:category/:id',
    component: SingleProductComponent,
  },
  // {
  //   path: 'products',
  //   children: [
  //     {
  //       path: 'mens/:id',
  //       component: SingleProductComponent,
  //     },
  //     {
  //       path: 'womens/:id',
  //       component: SingleProductComponent,
  //     },
  //     {
  //       path: 'watches/:id',
  //       component: SingleProductComponent,
  //     },
  //   ],
  // },
  { path: 'notFound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
