"use client";

import MyReservationCard from "./MyReservationCard";
import ReactPaginate from "react-paginate";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase/firebase";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { DummyContentCard } from "./DummyCard";

const itemsPerPage = 3;

const MyReservations = () => {
  const { data: session, status } = useSession({ required: true });
  const uid = session?.user?.id;
  const [myReservations, setMyReservations] = useState([]);
  const collectionRef = useMemo(() => collection(firestore, "reservations"), []);

  useEffect(() => {
    if (status !== "authenticated" || !uid) return;
    const q = query(collectionRef, where("diner.id", "==", uid), orderBy("createdAt", "desc"));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) return;
      setMyReservations(querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, [collectionRef, status, uid]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = myReservations.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(myReservations.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % myReservations.length;
    setItemOffset(newOffset);
  };
  return (
    <section
      className="w-full relative isolate scroll-mt-10 md:scroll-mt-20  md:py-8 lg:py-12 overflow-hidden px-[5]"
      id="my-reservations"
    >
      <header className=" relative mx-auto max-w-3xl w-full  md:pl-2 md:pb-4 flex-col sm:flex-row flex justify-between items-center md:h-9">
        <h1 className="text-2xl align-middle mb-3 sm:mb-0">My Reservations</h1>
        <div className="flex gap-2 items-center flex-wrap justify-center pb-2 sm:pb-0">
          {myReservations.length === 0 && (
            <>
              <span className="h-6 w-32 md:w-64 rounded-full shimmer" />
              <span className="h-6 w-7 rounded-full shimmer" />
              <span className="h-6 w-7 rounded-full shimmer" />
            </>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1}
          />
        </div>
      </header>

      <div className="mx-auto max-w-3xl w-full bg-zinc-100 p-2 md:p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          {myReservations.length === 0 && (
            <>
              <DummyContentCard />
              <DummyContentCard />
              <DummyContentCard />
            </>
          )}
          <Reservations currentItems={currentItems} />
        </div>
      </div>
    </section>
  );
};

export default MyReservations;

function Reservations({ currentItems }) {
  return (
    <>
      {currentItems.map((d, i) => (
        <MyReservationCard i={i} data={d} key={i} />
      ))}
    </>
  );
}
