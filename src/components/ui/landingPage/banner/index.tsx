'use client'

// Next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// Biblioteca
import { IoLogoWhatsapp } from "react-icons/io";
import { motion } from "framer-motion";

// Tipagem
interface BannnerProps {
  imagemUrl: StaticImageData;
}

export function Banner({ imagemUrl }: BannnerProps) {
  return (
    <motion.div
      className="relative w-full h-[520px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Image
        src={imagemUrl}
        quality={100}
        priority
        className="absolute inset-0 object-cover w-full h-full"
        alt="Banner"
        layout="fill"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 mx-auto text-center md:text-left">
        <motion.div
          className="space-y-6 md:w-10/12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.span
            className="inline-block px-5 py-2 text-xs font-bold tracking-wider text-white uppercase bg-opacity-30 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Seu catálogo, onde quiser
          </motion.span>

          <motion.h1
            className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Leve sua loja para o mundo com um catálogo digital simples
          </motion.h1>

          <motion.p
            className="text-base text-gray-300 md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Apresente seus produtos ou cardápios de maneira prática e moderna,
            com a possibilidade de vender online ou por retirada na loja.
            Facilite a experiência do cliente e aumente suas vendas.
          </motion.p>

          <Link href="https://wa.me/5585987805592/?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20seu%20sistema%20e%20as%20informações%20disponíveis." target="_blank">
            <motion.button
              className="flex items-center justify-center gap-3 px-8 py-3 mt-6 text-sm font-medium text-black uppercase transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Chamar no WhatsApp
              <IoLogoWhatsapp size={22} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
