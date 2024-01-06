"use client";

import React, { useState, FormEvent } from 'react';

type Market = {
  name: string;
  province: string;
};

type NewMarketProps = {
  action: (market: Market) => Promise<void>;
};

export default function NewMarket({ action }: NewMarketProps) {
  const [name, setName] = useState('');
  const [province, setProvince] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await action({ name, province });
    // Reset form
    setName('');
    setProvince('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
      <label htmlFor="province">Province</label>
      <input type="text" id="province" name="province" value={province} onChange={e => setProvince(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}