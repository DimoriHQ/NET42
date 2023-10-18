import React from 'react';

interface NFTCardProps {
    nft: {
        media: { gateway: string }[];
        title: string;
        id: { tokenId: number };
        contract: { address: string };
        description: string;
    };
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} alt="NFT Media" />
            </div>
            <div className="flex flex-col gap-y-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div>
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">Id: {nft.id.tokenId}</p>
                    <p className="text-gray-600">{nft.contract.address}</p>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;