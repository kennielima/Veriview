import React from 'react'
import CreateReviewForm from './components/CreateReviewform'
import { fetchProducts } from '../hooks/useGetProducts';
import getCurrentUser from '@/lib/getCurrentUser';

const page = async () => {
  const Brands = await fetchProducts();
  const user = await getCurrentUser();

  return (
    <CreateReviewForm brands={Brands} user={user} />
  )
}

export default page