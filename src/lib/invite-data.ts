export const invite = {
  brideFirst: "Jayne",
  groomFirst: "Alan",
  brideInitial: "J",
  groomInitial: "A",
  /** Wedding date & time (local) */
  date: "2027-03-06T18:30:00",
  dateLine: { day: "Saturday", month: "March", number: "6", year: "2027" },
  invitationLine: "together with their families, request the honour of your presence",
  couple: [
    {
      name: "Jayne",
      role: "the bride",
      line: "Daughter of Mr. & Mrs. Whitmore",
      note: "A lover of old gardens, longer letters and slow mornings.",
    },
    {
      name: "Alan",
      role: "the groom",
      line: "Son of Mr. & Mrs. Ferreira",
      note: "Collector of records, rain-soaked drives and quiet courage.",
    },
  ],
  quote: {
    text: "And in all this world of gardens, my heart chose one bloom — and called it forever.",
    source: "a vow, written in gold",
  },
  blessing: {
    text: "Grow old with me; the best is yet to be.",
    source: "Robert Browning",
  },
  story: [
    { year: "2019", title: "A Courtyard in Bloom", note: "Two strangers under the same bougainvillea, waiting out the rain." },
    { year: "2021", title: "Letters & Long Drives", note: "Cities apart, a thousand pages of us." },
    { year: "2024", title: "The Question", note: "Asked at dusk, answered before the sentence ended." },
    { year: "2027", title: "Forever", note: "The garden gates open once more — this time for always." },
  ],
  ceremony: [
    { title: "Mehendi", time: "4 March · 5:00 PM", place: "The Courtyard Gardens", note: "Henna, chai and marigold light" },
    { title: "Sangeet", time: "5 March · 7:30 PM", place: "The Mirror Ballroom", note: "An evening of music and dance" },
    { title: "Wedding Ceremony", time: "6 March · 6:30 PM", place: "The Rose Pavilion", note: "The sacred vows at dusk" },
    { title: "Reception", time: "6 March · 9:00 PM", place: "The Grand Terrace", note: "Dinner beneath the chandeliers" },
  ],
  families: [
    { house: "The Whitmores", names: ["Mr. & Mrs. Edward Whitmore", "Miss Clara Whitmore", "Master Rohan Whitmore"] },
    { house: "The Ferreiras", names: ["Mr. & Mrs. Joseph Ferreira", "Mrs. Anna D'Souza", "Mr. Ian Ferreira"] },
  ],
  gallery: [
    { caption: "The courtyard where it began" },
    { caption: "Blossoms from her grandmother's garden" },
    { caption: "The evening he asked" },
    { caption: "Gold, ivory and everything after" },
  ],
  rsvp: {
    by: "Kindly reply before 10 February 2027",
    hosts: [
      { name: "Clara Whitmore", phone: "+91 98200 11223" },
      { name: "Ian Ferreira", phone: "+91 98200 44556" },
    ],
    email: "jayne.and.alan@wedding.invite",
  },
  venue: {
    name: "The Leela Palace",
    address: "Diplomatic Enclave, Chanakyapuri, New Delhi 110023",
    mapsQuery: "The Leela Palace New Delhi",
  },
  dressCode: "Royal florals · gold, ivory & jewel tones",
  closing: "An evening of gold, garden light and forever.",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  invite.venue.mapsQuery,
)}`;
