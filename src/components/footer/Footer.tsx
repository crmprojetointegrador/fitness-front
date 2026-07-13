import { GithubLogoIcon } from "@phosphor-icons/react";

function Footer() {
    let data = new Date().getFullYear();

    return (
        <div className="bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] text-gray-700 flex justify-center text-center py-4 mt-auto">
            <div className="container flex flex-col items-center py-4">
                <p className='text-xl font-bold'>
                    PowerPlace App © {data}
                </p>
                <p className='text-lg'>Acesse o repositório do nosso projeto</p>
                <div className='flex gap-2'>
                    <a href="https://github.com/crmprojetointegrador/fitness-front" target="_blank" rel="noopener noreferrer">
                        <GithubLogoIcon size={48} weight='bold' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;