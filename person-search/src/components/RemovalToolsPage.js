import React, { useState } from 'react';

const tools = [
  {
    name: 'Incogni',
    description:
      'Focuses on removing your data from over 180 data broker databases and people-search sites. Works with brokers across the US, UK, and Europe. Automatically sends out and follows up on deletion requests. Regularly rechecks to ensure data hasn\'t been reacquired. Offers a dashboard to track progress.',
    link: 'https://incogni.com/',
  },
  {
    name: 'DeleteMe',
    description:
      'Specializes in removing data from US-based brokers. Rechecks your profile every two months. Recently expanded to a few other locations.',
    link: 'https://joindeleteme.com/',
  },
  {
    name: 'Privacy Bee',
    description:
      'A comprehensive data removal service working with over 200 brokers and people-search sites. Can alert you if your information is leaked online.',
    link: 'https://privacybee.com/',
  },
  {
    name: 'YouWipe',
    description:
      'Focuses on cleaning traces left by your online presence. Cleans browsing history, cookies, and hidden cache files. Designed with a simple, user-friendly interface.',
    link: 'https://youwipe.com/',
  },
  {
    name: 'Privacy Eraser',
    description:
      'Offers a comprehensive suite of tools for digital cleaning. Purges both digital and physical storage spaces. Optimizes device performance by clearing redundant files. Customizable features for tailored cleaning.',
    link: 'https://www.cybertronsoft.com/privacy-eraser/',
  },
  {
    name: 'SysTools Data Wipe Software',
    description:
      'Permanently erases digital footprints from devices. Removes data residue and clears program traces. Adheres to over 20 international data deletion standards. Works on various storage devices (SSD, HDD, USB, etc.).',
    link: 'https://www.systoolsgroup.com/data-wipe/',
  },
  {
    name: 'EasyOptOuts',
    description: 'A service that helps remove your name, address, phone number, and more from online platforms and data brokers.',
    link: "https://easyoptouts.com/"
  }
];

function RemovalToolsPage() {


  return (
    <section >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Digital Footprint Removal Tools</h2>
      </div>
          <p className="p-4">
          These tools offer different features, pricing, and focus areas, so the best choice depends on your specific needs for digital footprint removal. I am in no way sponsored or affiliated with any of these companies or tools, and do not provide any guarantees about their effectiveness.
          </p>
          <div className="space-y-6 p-4">
            {tools.map((tool, index) => (
            <div
            key={index}
            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md"
            >                
            <h3 className="text-xl font-semibold">
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {tool.name}
                  </a>
                </h3>
                <p className="mt-2">{tool.description}</p>
              </div>
            ))}
          </div>
        
      
    </section>
  );
}

export default RemovalToolsPage;
