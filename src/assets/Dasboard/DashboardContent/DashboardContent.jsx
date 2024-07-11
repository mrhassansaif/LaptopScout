import React from "react";
import "./DashboardContent.css";
import Button from 'react-bootstrap/Button';
import { MdScreenShare } from "react-icons/md";



function DashboardContent() {
    const openNewWindow = (color) => {
  let backgroundColor;
  switch (color) {
    case "WHITE":
      backgroundColor = "#ffffff";
      break;
    case "GREEN":
      backgroundColor = "#7CFC00";
      break;
    case "RED":
      backgroundColor = "#ff0000";
      break;
    case "BLACK":
      backgroundColor = "#000000";
      break;
    default:
      backgroundColor = "#ffffff";
  }

  const newWindow = window.open("", "_blank", "width=800,height=600");
  newWindow.document.write(`
    <html>
      <head>
        <title>New Window</title>
        <style>
          body {
            background-color: ${backgroundColor};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          h1, h2 {
            color: #333;
          }
        </style>
      </head>
      <body>
        <h1>${color}</h1>
        <h2>Press F11 for fullscreen</h2>
      </body>
    </html>
  `);
};
  return (
    <div className="container">
      <h1>Laptop Check-Up and Shortcuts</h1>

      <div className="section">
        <h2>Questions</h2>
        <ul>
          <li><span className="cmd">General:</span></li>
          <li>What is the exact model and specifications of the laptop?</li>
          <li>What is the price?</li>
          <li><span className="boost">Note it down (Price Compare)</span>&nbsp;&nbsp;Shop Card lo or us pe likh walo sub</li>
          <li><span className="cmd">Warranty:</span></li>
          <li>Is the laptop still under warranty?</li>
          <li>Time Limit? min 20days</li>
          <li>Screen and What is not covered?</li>
          <li>Are all ports and connectivity options (USB, HDMI, Ethernet, Wi-Fi, Bluetooth, Audio Jack) fully functional?</li>
          <li>Koi repairs or parts replaced (Backside Kholl)</li>
          <li>Battery Timing or Health Kesi ha? Original Charger?</li>
          <li><span className="boost">Inspect The Parchi</span></li>
        </ul>
      </div>

      <div className="section">
        <h2>Shortcuts</h2>
        <ul>
          <li><span className="shortcut">Shut Down:</span> Win + X, U, U</li>
          <li><span className="shortcut">Open CMD with Admin:</span> Win + X</li>
        </ul>
      </div>

      <div className="section">
        <h2>Check-Up Guide</h2>
        <ul>
          <li><span className="check">Check Hz setting in display:</span> Verify the refresh rate settings in display options</li>
          <li><span className="check">Jo Dikhta woh Bik ta?:</span> Any visible scratches, dents, or damages on the laptop body?</li>
          <li><span className="check">Keyboard or Trackpad:</span> Any issues (sticky keys, unresponsive trackpad)?</li>
          <li><span className="check">Speakers, Camera, and Microphone:</span> Any distortion</li>
          <li><span className="check">White Color&nbsp;&nbsp;&nbsp;<Button variant="light" onClick={() => openNewWindow('WHITE')}><MdScreenShare /></Button></span>&nbsp;&nbsp;&nbsp;&lt;&lt; -- Click to open white screen
          </li>
          <li><span className="check">Green Color&nbsp;&nbsp;&nbsp;<Button variant="success" onClick={() => openNewWindow('GREEN')} ><MdScreenShare /></Button></span>&nbsp;&nbsp;&nbsp;&lt;&lt; -- Click to open green screen
          </li>
          <li><span className="check">Red Color&nbsp;&nbsp;&nbsp;<Button variant="danger" onClick={() => openNewWindow('RED')} ><MdScreenShare /></Button></span>&nbsp;&nbsp;&nbsp;&lt;&lt; -- Click to open red screen
          </li>
          <li><span className="check">Black Color&nbsp;&nbsp;&nbsp;<Button variant="dark" onClick={() => openNewWindow('BLACK')} ><MdScreenShare /></Button></span>&nbsp;&nbsp;&nbsp;&lt;&lt; -- Click to open black screen
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>Tools</h2>
        <ul>
          <li><a href="https://nzxt.com/software/cam" target="_blank" className="tool">NZXT Cam: &nbsp;<i className="fa-solid fa-download"></i></a> Monitor system performance and temperatures.</li>
          <li><a href="https://crystalmark.info/en/" target="_blank" className="tool">CrystalDiskInfo:&nbsp; <i className="fa-solid fa-download"></i></a> Check [SSD Name] ssd tbw rating (Google or ChatGPT)</li>
          <li><a href="https://crystalmark.info/en/" target="_blank" className="tool">CrystalDiskMark:&nbsp; <i className="fa-solid fa-download"></i></a> Inspect disk speed and performance.</li>
          <li><a href="https://www.alcpu.com/CoreTemp/" target="_blank" className="tool">CoreTemp: &nbsp;<i className="fa-solid fa-download"></i></a> Monitor CPU temperature.</li>
          <li><span className="tool">Windows Memory Diagnostics:&nbsp;<i className="fa-solid fa-magnifying-glass"></i></span> Test system memory for errors. (Search in TaskBar)</li>
        </ul>
      </div>

      <div className="section">
        <h2>Generate Battery / Energy Report</h2>
        <ul>
          <li><span className="cmd">Power Efficiency Report:</span> powercfg /batteryreport</li>
          <li><span className="boost">Advice:</span> FULL CHARGE CAPACITY Must be 60%-70% of DESIGN CAPACITY</li>
          <li><span className="cmd">Power Efficiency Report:</span> powercfg -energy</li>
          <li><span className="boost">Advice:</span> FULL CHARGE CAPACITY V/S DESIGN CAPACITY</li>
        </ul>
      </div>

      <div className="section">
        <h2>Processor Types</h2>
        <ul>
          <li><span className="boost">U/P:</span> Basic use</li>
          <li><span className="boost">H/HS/HX:</span> Gaming use</li>
        </ul>
      </div>

      <div className="section">
        <h2>RAM</h2>
        <ul>
          <li><span className="check">Check RAM Speed:</span> Ensure RAM is at least 3200MHz.</li>
        </ul>
      </div>

      <div className="section">
        <h2>System Information</h2>
        <ul>
          <li><span className="cmd">System Information:</span> systeminfo</li>
          <li><span className="cmd">TaskManager (Admin Edition)</span> tasklist</li>
          <li><span className="cmd">System's Model Number :</span> WMIC CSPRODUCT GET NAME</li>
          <li><span className="cmd">System's SerialNumber</span> WMIC BIOS GET SERIALNUMBER</li>
        </ul>
      </div>

      <div className="section">
        <h2>Boost, Security, and Fix Commands</h2>
        <ul>
          <li><span className="boost">Check Health of Windows Image:</span> Dism /online /Cleanup-Image /CheckHealth</li>
          <li><span className="boost">Clear Temporary Files:</span> prefetch, temp, %temp%, mrt, cleanmgr</li>
          <li><span className="boost">Flush DNS:</span> ipconfig /flushdns</li>
          <li><span className="boost">Admin Users</span> netplwiz</li>
        </ul>
      </div>

      <div className="section">
        <ul>
          <li className="liending"><center><span className="ending">Made with " <i className="fa-solid fa-heart" style={{ color: "#ff1010" }}></i> " by Hassan, for all those tech buyers to not get scammed.</span></center></li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardContent;
