import PageBanner from '@/components/UI/PAges/PageBanner';
import RootLayout from '@/components/layouts/RootLayout';
import { IFlightDeal } from '@/components/utils/Types';
import { baseUrl } from '@/components/utils/url';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { TbArrowsExchange } from 'react-icons/tb';
import { GetServerSidePropsContext } from 'next';

export default function PackagesDetails({ packageDetails }: { packageDetails: IFlightDeal }) {
    console.log(packageDetails);

    const { _id, from, to, startDate, endDate, price, img, type, desc, ratings, status, reviews } = packageDetails;


    return (
        <>
            <PageBanner>
                <div className='text-center '>
                    <h1 className='text-5xl font-bold  '>Package Details</h1>
                    <p className='text-semibold   mt-2'>
                        <Link href={"/"}>Home</Link> / Package / <span className='text-secondary'>Package Details</span></p>
                </div>
            </PageBanner>

            <div className='bg-lightBg text-textClr py-10'>
                <div className='max-w-5xl mx-auto flex flex-col lg:flex-row px-5 lg:px-0 items-center  gap-3 bg-white shadow-md rounded-md '>

                    <div className='w-full lg:w-1/2 h-full lg:h-[420px]'>
                        <img src={img} alt={from} className='w-full h-full rounded-l-md' />
                    </div>

                    <div className='w-full lg:w-1/2 p-3'>
                        <div>
                            <h1 className='text-2xl font-bold text-primary  '>{from} <TbArrowsExchange className="text-3xl" /> {to}</h1>
                            <h3 className='font-bold'>Date: <span > {startDate} -- {endDate}</span></h3>
                        </div>
                        <div>
                            <p>Ratings: <span className='font-bold text-green-700'>{ratings} stars</span></p>
                            <p>Status: {status}</p>
                            <p>Ticket Type: {type}</p>
                            <p>Price : <span className='text-primary font-bold text-xl'>{price}$</span></p>
                        </div>
                        <p >Descriptions: </p><p className='mb-3'>{desc}</p>

                        <Link href={`/booking-now/${_id}`}  > <Button color='warning'>Book Now</Button></Link>
                    </div>


                </div>

                <div className='bg-white max-w-5xl mx-auto p-5 mt-3 shadow-md rounded-md'>
                    <h1 className='text-2xl font-bold'>Reviews:</h1>
                    {
                        reviews.map((rev, index) => <div key={index} className='mt-3 flex gap-2 items-center'>
                            <FaUserCircle className="text-3xl" />
                            <div>
                                <h3 className='font-bold'>{rev.user}</h3>
                                <p className='text-sm'>{rev.review}</p>
                            </div>
                        </div>)
                    }


                </div>
            </div>
        </>

    )
};


PackagesDetails.getLayout = function getLayout(page: React.ReactNode) {
    return <RootLayout>{page}</RootLayout>;
};


//SSR
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params } = context;
    const res = await fetch(`${baseUrl}/deal/${params.id}`);
    const data = await res.json();
    // console.log(data)

    return {
        props: {
            packageDetails: data,
        }
    }
};


