'use client';

import { useState } from 'react';
import {  MessageCircle, Plus, Minus, Facebook } from 'lucide-react';
import { FaWhatsapp,  } from 'react-icons/fa';
import Container from '../shared/Container';
import Link from 'next/link';
import { useDashboard } from '@/context/DashboardContext';
import { Icon } from '@iconify/react';
import Subscription from './Subscription';
import Image from 'next/image';

export default function Footer() {
  const [openPanel, setOpenPanel] = useState(null);
  const { activeSection, setActiveSection } = useDashboard()
  const togglePanel = (panelId) => {
    setOpenPanel(prev => (prev === panelId ? null : panelId));
  };


  const panels = [
    {
      id: "order",
      title: "Order Info",
      items: [
        { label: "Order Tracking", href: "/order-tracking", id: "trackOrder", },
        { label: "Pre Order", href: "/dashboard", id: "preOrder" },
        { label: "Return Policy", href: "/refund-returned" },
        { label: "WishList", href: "/dashboard", id: "wishlist" },
        // { label: "Gift Vouchers", href: "/gift-voucher" },

      ],
    },
    {
      id: "customer",
      title: "Customer Care",
      items: [
        { label: "Contact Us", href: "/contact" },
        { label: "My Account", href: "/dashboard", id: "account", },
        { label: "Login", href: "/login" },
        { label: "Sign Up", href: "/signup" },
        { label: "Outlets", href: "/outlets" },

      ],
    },
    {
      id: "company",
      title: "Company Info",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Term & Conditions", href: "/terms" },
        { label: "Pre Order Policy", href: "/preorder-policy" },
        { label: "International Order Policy", href: "/international-policy" },


      ],
    },
  ];

  return (
    <footer className="overflow-hidden">
      <div className="bg-[#3A9E75] pt-12 pb-6">
        <div className="text-white mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16">
          {/* Newsletter */}
          <Subscription />

          <div className="mx-auto ">
            <div className='grid gap-5  w-full justify-between grid-cols-1 sm:grid-cols-4'>
              <div className="flex flex-col gap-6 text-md text-white mt-2 mb-8">
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  <span>Chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/8801752058475"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 "
                  >
                    <FaWhatsapp size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>


                <a
                  href="https://www.facebook.com/Lukazshopp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 cursor-pointer "
                >
                  <Icon icon="mingcute:facebook-line" width="20" height="20" />
                  <span>Facebook</span>
                </a>

                <Link
                  href="/contact"
                  className="flex items-center gap-2">
                  <Icon icon="material-symbols:mail-outline" width="20" height="20" />
                  {/* <Mail size={16} /> */}
                  <span>Contact Us</span>
                </Link>


              </div>
              {/* Panel Sections */}
              {panels.map(panel => (
                <div key={panel.id}>
                  {/* Desktop View */}
                  <div className="hidden sm:block">
                    <h3 className="text-2xl font-bold mb-3">{panel.title}</h3>
                    <ul className="space-y-2 text-md text-gray-200">
                      {panel.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            onClick={() => setActiveSection(item?.id)}
                            href={item.href} className="text-gray-200 hover:text-gray-300">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile Accordion View */}
                  <div className="sm:hidden ">
                    <button
                      onClick={() => togglePanel(panel.id)}
                      className="w-full flex justify-between items-center text-left font-bold text-xl "
                    >
                      {panel.title}
                      {openPanel === panel.id ? <Minus size={18} /> : <Plus size={18} />}
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${openPanel === panel.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <ul className="mt-2 space-y-2 text-md text-gray-200 pl-1">
                        {panel.items.map((item, idx) => (
                          <li key={idx}> <Link
                            onClick={() => setActiveSection(item?.id)}
                            href={item.href} className="text-gray-200 hover:text-gray-300">
                            {item.label}
                          </Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



          <div className="hidden md:flex w-full mt-8 bg-white   items-center">
            <Image
              src="/images/payments/sll_all_s.png"
              alt="Available Payment Methods"
              width={1640}
              height={250}
              className="w-full h-auto"
            />
          </div>

          <div className="flex md:hidden w-full mt-8 bg-white   items-center">

            <Image
              src="/images/payments/sll_all_m.png"
              alt="Available Payment Methods"
              width={1640}
              height={250}
              className="w-full h-auto"

            />
          </div>






        </div>
      </div>
      <Container className="py-3 text-center bg-white">
        <p>Copyright © 2025 B-Lukaz | All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
