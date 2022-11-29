import Link from "next/link";

import { useState } from "react";
import Router from "next/router";

function Samples({ data }: { data: any }) {
  const [search, setSearch] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    Router.push("/samples/" + search);
  }

  return (
    <>
      <div>{data && data.test}</div>
    </>
  );
}

export default Samples;

export const getServerSideProps = async (context: any) => {
  const { search }: { search: string } = context.query;
  const res = await fetch("https://127.0.0.1:3000/api/images/");
  const data: any = await res.json();
  // await new Promise((resolve)=>{
  //   setTimeout(resolve,10000)
  // })
  return {
    props: {
      data: data,
    },
  };
};
