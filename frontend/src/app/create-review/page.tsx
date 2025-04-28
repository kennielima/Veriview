import React from 'react'
import CreateReviewForm from './components/CreateReviewform'
import { fetchProducts } from '../hooks/useGetProducts';
import getCurrentUser from '@/lib/getCurrentUser';

const page = async () => {
  const { data } = await fetchProducts();
  const user = await getCurrentUser();

  return (
    <CreateReviewForm brands={data} user={user} />
  )
}

export default page