
import { useState } from 'react';
import { 
  Camera,
  Image,
  Hammer,
  Palette,
  MonitorSmartphone,
  Film,
  Settings,
  Scan,
  HardDrive,
  Users,
  Shield,
  FileX,
  RefreshCw
} from 'lucide-react';
import ExpansibleTab from '@/components/ExpansibleTab';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProductionGuidelines = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Production & Post-Production Guidelines</h2>
          <p className="mb-6 text-muted-foreground">
            Comprehensive guidelines for ensuring technical quality and consistency across all Fuke's Media productions.
            These guidelines cover everything from archival footage handling to color management workflows and specialized equipment requirements.
          </p>

          {/* Section 1: Archival and Found Footage */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <FileX className="mr-2 h-5 w-5 text-red-600" />
                <span>1. Archival and Found Footage Best Practices</span>
              </div>
            }
            defaultOpen={true}
            className="mb-6"
          >
            <div className="space-y-4">
              <p><strong>Purpose:</strong> Maximize image quality and reduce errors when using archival/found footage. Practices may vary per project. Contact your Fuke's Media Post lead for questions.</p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="aspect-ratio">
                  <AccordionTrigger>Aspect Ratio</AccordionTrigger>
                  <AccordionContent>
                    Choose the finishing aspect ratio (e.g., 1.78:1) in advance and apply framing/moves in offline within a matching canvas to ensure proper translation to finishing. Align with the finishing facility on this.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="workflow">
                  <AccordionTrigger>Non-Destructive Workflow</AccordionTrigger>
                  <AccordionContent>
                    Ensure editorial proxies link back to original source files. Test this with the finishing facility.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="frame-rate">
                  <AccordionTrigger>Frame Rate/Scaling</AccordionTrigger>
                  <AccordionContent>
                    Perform frame rate conversion and scaling during finishing, not before. Provide archival footage as close to its native state as possible. Using a single processing method beforehand limits flexibility.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="collaboration">
                  <AccordionTrigger>Collaboration</AccordionTrigger>
                  <AccordionContent>
                    Align with downstream stakeholders, especially the finishing facility, early and often, particularly for projects heavy with archival footage. Test samples through the entire proposed pipeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="source-versions">
                  <AccordionTrigger>Source Versions</AccordionTrigger>
                  <AccordionContent>
                    Be aware that pre-purchase/temp archival versions may differ (frame rate, name, aspect ratio, resolution) from final purchased versions. Plan time to manage this.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="frame-rate-conversion">
                  <AccordionTrigger>Frame Rate Conversion</AccordionTrigger>
                  <AccordionContent>
                    There's no single method; multiple tools might be needed, leveraging techniques like duplicating/removing frames, re-interpreting speed, blending frames, or generating new frames.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="qc-process">
                  <AccordionTrigger>QC Process</AccordionTrigger>
                  <AccordionContent>
                    Fuke's Media's QC aims to maintain creative intent. All technical issues are flagged, but fixes are approached through conversation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="common-issues">
                  <AccordionTrigger>Common QC Issues</AccordionTrigger>
                  <AccordionContent>
                    Dead pixels, low-quality conversions, aliasing, interlacing, stutter, frame blending, artifacting, banding, macro blocking, dirt/dust, moire, mismatched frame edges.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ExpansibleTab>

          {/* Section 2: Image Blow-Up Considerations */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Image className="mr-2 h-5 w-5 text-red-600" />
                <span>2. Image Blow-Up Considerations</span>
              </div>
            }
          >
            <div className="space-y-4">
              <p>Image blow-ups resulting in an effective resolution less than 4k count towards the non-approved 4k camera footage allotment.</p>
              
              <h4 className="font-semibold mt-4 mb-2">Maximum Blow-up Allowances:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>8k (2.0x)</li>
                <li>7k (1.75x)</li>
                <li>6k (1.5x)</li>
                <li>5k (1.25x)</li>
                <li>4k (1x)</li>
              </ul>
              <p>These values maintain an effective 4k resolution.</p>
              
              <div className="bg-muted/30 p-4 rounded-md mt-4">
                <h4 className="font-semibold mb-2">Resolution Calculation Example:</h4>
                <p>Original footage: 8K (7680 × 4320)</p>
                <p>Maximum blow-up factor: 2.0x</p>
                <p>This ensures the footage maintains at least 4K (3840 × 2160) effective resolution after scaling.</p>
              </div>
            </div>
          </ExpansibleTab>

          {/* Section 3: Titles & Graphics */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-red-600" />
                <span>3. Titles & Graphics: Requirements & Best Practices</span>
              </div>
            }
          >
            <div className="space-y-4">
              <p><strong>Introduction:</strong> Requirements are based on experience; best choices depend on project factors. Contact your Fuke's Media Post Manager or Production Technology Specialist with questions.</p>
              
              <h4 className="font-semibold mt-4 mb-2">Requirements:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Frame within at least UHD (3840 pixels wide) canvas matching finishing aspect ratio. Contact Fuke's Media Post Management if finishing format is less.</li>
                <li>Share framing charts/aspect ratio with all vendors.</li>
                <li>Deliveries must be 16-bit EXR (uncompressed or lossless ZIP/PIZ, no LOG), 16-bit uncompressed TIFF, or 16-bit DPX (only for full screen, non-comped). ProRes 4444 may be allowed for select Nonfiction/Animation***.</li>
                <li>Sidecar mattes/alphas need 1:1 frame numbering with fill.</li>
                <li>Establish and communicate color pipeline to all vendors; perform round-trip tests early.</li>
                <li>Share Show Looks (LUTs, CDLs, LMTs) with all vendors.</li>
                <li>***Graphics/Titles in Linear ACES must be 16-bit EXR.</li>
              </ul>
              
              <h4 className="font-semibold mt-4 mb-2">Best Practices:</h4>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="title-safe">
                  <AccordionTrigger>Title Safe/Safe Action</AccordionTrigger>
                  <AccordionContent>
                    Recommend adhering to SMPTE guidelines (Title Safe 90%, Safe Action 93% of 16x9). Confirm with creative partner if text/graphics exceed safe action. Motion text/graphics are fine if readable within safe action at some point.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="color-grading">
                  <AccordionTrigger>Color Grading Plates</AccordionTrigger>
                  <AccordionContent>
                    Debayering handled by finishing facility if possible. Process plates like other material (e.g., use ACES if grading in ACES). Pre-timing/balancing should be in scene-referred colorspace (ACES, Camera Log).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery-archive">
                  <AccordionTrigger>Delivery/Archive</AccordionTrigger>
                  <AccordionContent>
                    Confirm final format (container, compression) with finishing facility. Deliver final rendered files (with mattes/alphas) to Fuke's Media via Content Hub for archive. Provide project files, textless versions, and mattes. May need an archivable GFX "Toolkit" (textless backplates, editable font layer, plugin list, font list, compositing colorspace list).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="editorial">
                  <AccordionTrigger>Editorial</AccordionTrigger>
                  <AccordionContent>
                    Clearly communicate proxy format needs between Offline Editorial and Title/GFX vendors.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="anamorphic">
                  <AccordionTrigger>Anamorphic</AccordionTrigger>
                  <AccordionContent>
                    Align with DI facility on squeezed/un-squeezed pipeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hdr">
                  <AccordionTrigger>HDR</AccordionTrigger>
                  <AccordionContent>
                    No strict brightness limits for text, but 100-400 nits common guidance. Test SDR graphics derived from HDR early; perform color/compositing tests with sample frames for both SDR/HDR.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="color-management">
                  <AccordionTrigger>Color Management</AccordionTrigger>
                  <AccordionContent>
                    Popular GFX software often uses limited display-referred spaces (like sRGB). Until better scene-referred support (like ACES) is common, best practice is to generate elements in standard spaces (sRGB) and use Input Transforms/LUTs to convert to the project's working space. Investigate plugins/workarounds like OpenColorIO.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ExpansibleTab>

          {/* Section 4: Display Calibration */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <MonitorSmartphone className="mr-2 h-5 w-5 text-red-600" />
                <span>4. Color Critical Display Calibration Guidelines</span>
              </div>
            }
          >
            <div className="space-y-4">
              <h4 className="font-semibold mt-2 mb-2">Calibration Targets:</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">SDR Reference Monitor (Minimum)</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Rec.709 gamut</li>
                    <li>D65 white point</li>
                    <li>BT.1886 (Gamma 2.4) EOTF</li>
                    <li>&lt;= 0.05 nits black</li>
                    <li>100 nits peak</li>
                    <li>&gt;= 2000:1 contrast</li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">HDR (Dolby Vision) Reference Monitor (Minimum)</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>P3 gamut</li>
                    <li>D65 white point</li>
                    <li>PQ (ST.2084) EOTF</li>
                    <li>&lt;= 0.005 nits black</li>
                    <li>1000 nits peak</li>
                    <li>&gt;= 200,000:1 contrast</li>
                    <li>(See Dolby Vision docs for details)</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-semibold mt-4 mb-2">Critical Viewing Environment:</h4>
              <p>Calibrated UHD display, controlled lighting/decor, proper observer placement.</p>
              
              <h5 className="font-medium mt-3 mb-1">Surround:</h5>
              <p>D65 illumination matching display, neutral matte walls, 5 nits level, wide FOV (90° H, 60° V).</p>
              
              <h5 className="font-medium mt-3 mb-1">Distance:</h5>
              <p>3-3.2 picture heights (HD), 1.5-1.6 picture heights (UHD). See SMPTE ST.2080-3.</p>
              
              <h4 className="font-semibold mt-4 mb-2">Calibration Best Practices:</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Set Black Level (PLUGE pattern)</li>
                <li>Set White Level/Peak Luminance (Contrast pattern, check near-white clipping, adjust backlight/contrast)</li>
                <li>Measure Greyscale (≥ 11 steps)</li>
                <li>Adjust Greyscale (RGB gain/bias) to hit targets</li>
                <li>Reset White/Black Levels</li>
                <li>Measure/Adjust RGB Primaries/Ramps</li>
              </ol>
              
              <p className="mt-2"><em>Note: Calman software has a "Fuke's Media Video Monitor" template for SDR calibration.</em></p>
            </div>
          </ExpansibleTab>

          {/* Section 5: Dolby Vision */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-red-600" />
                <span>5. Dolby Vision HDR Mastering Guidelines</span>
              </div>
            }
          >
            <div className="space-y-4">
              <p>Dolby Vision maintains creative intent to consumer devices. All Fuke's Media Originals delivering HDR must be mastered in Dolby Vision and delivered per IMF specs. Fuke's Media derives Dolby Vision, HDR10, SDR streams from this package.</p>
              
              <div className="bg-muted/30 p-4 rounded-md">
                <p>Dolby Vision 4.0 is supported but not required; 2.9 is still supported. Many color grading/packaging systems support 4.0. List available from Dolby.</p>
                <p className="mt-2">4.0 deliveries require CMVersion [41] and embedded metadata in IMF Picture Trackfile.</p>
              </div>
              
              <h4 className="font-semibold mt-4 mb-2">Needed:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Professional HDR monitor ( P3 D65, PQ, &gt;=1000 nits)</li>
                <li>Professional SDR monitor (Rec.709, BT.1886, 100 nits)</li>
                <li>Dolby Vision supported software</li>
                <li>Dolby Vision license (eCMU or iCMU)</li>
              </ul>
              
              <h4 className="font-semibold mt-4 mb-2">Deliver:</h4>
              <p>Dolby Vision IMF with embedded metadata per Fuke's Media Specs. Ensure metadata (Color Encoding, Mastering Display, Aspect Ratio) is accurate. Use Dolby's metafier validation before delivery.</p>
              
              <h4 className="font-semibold mt-4 mb-2">FAQ:</h4>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="training">
                  <AccordionTrigger>Training</AccordionTrigger>
                  <AccordionContent>
                    Dolby offers training/certification.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="workflow">
                  <AccordionTrigger>Grading Workflow</AccordionTrigger>
                  <AccordionContent>
                    Grade HDR first, then Dolby Vision analysis, then shot-by-shot SDR trim pass. HDR first usually yields best results for both. Result is single HDR master + XML metadata.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calibration">
                  <AccordionTrigger>Monitor Calibration</AccordionTrigger>
                  <AccordionContent>
                    HDR (P3, D65, PQ, model-dependent peak nits), SDR (Rec.709, D65, BT.1886, 100 nits). See Fuke's Media Calibration Guidelines.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="aces">
                  <AccordionTrigger>ACES ODT</AccordionTrigger>
                  <AccordionContent>
                    Use P3-D65 ST.2084 (1000 or 4000 nits) depending on monitor.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rec2020">
                  <AccordionTrigger>Rec.2020 Considerations</AccordionTrigger>
                  <AccordionContent>
                    Calibrate monitors to P3-D65, not Rec.2020, for consistency, as mapping Rec.2020 varies by monitor.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ExpansibleTab>

          {/* First 5 sections shown above, additional sections below */}
          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Film className="mr-2 h-5 w-5 text-red-600" />
                <span>6-8. Color Managed Workflow (Baselight, Resolve, iPad Pro)</span>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">6. Color Managed Workflow in Baselight</h3>
                <p className="mb-3">Reference for configuring Baselight for a color managed pipeline supporting quality asset delivery to Fuke's Media (including NAM). Recommendations, not requirements. Covers ACES and Camera Native workflows.</p>
                
                <h4 className="font-semibold mt-4 mb-2">ACES Workflow:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Scene Config: Create new scene using "ACES Template". Working Colour Space defaults to ACEScct: ACEScct / AP1.</li>
                  <li>Working Format resolution UHD/4K+. Frame rate matches delivery.</li>
                  <li>Set Viewing Colour Space in Cursors to match display calibration (e.g., Rec.1886 for SDR).</li>
                  <li>For NAM rendering: Use OpenEXR (half float, no/lossless compression), format matches Working Format.</li>
                </ul>
                
                <h4 className="font-semibold mt-4 mb-2">Camera Native Workflow:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Prep: Download manufacturer-specific Truelight files (.flspace, .fltransform, .cub).</li>
                  <li>Set Working Colour Space to log-encoded camera native (e.g., V-Log/V-Gamut, S-Log3/S-Gamut3.Cine).</li>
                  <li>Ensure DRT is a "family DRT" for Dolby Vision grades.</li>
                </ul>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">7. Color Managed Workflow in Resolve: ACES</h3>
                <p className="mb-3">Reference for configuring Resolve in ACES pipeline for Fuke's Media NAM delivery. Recommendations, not requirements.</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Project Settings: Color Management panel: Color Science -> ACEScct (recommended over ACEScc unless specific reason). Use latest ACES version.</li>
                  <li>ACES Output Device Transform (ODT): Match display calibration. SDR: Rec.709. HDR: P3-D65 ST.2084 (PQ) with monitor's nit level (e.g., 1000 nits).</li>
                  <li>For NAM rendering: Turn off ACES Output Transform (set to "No Output Transform"). Format EXR, Codec RGB half (no/lossless compression).</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">8. iPad Pro For Remote Color Review</h3>
                <p className="mb-3">Home base for documentation on using iPad Pros for remote color reviews.</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Settings & Config: Documents cover configuring display, brightness (Gen 5-7, Gen 2-4), and security settings for iPads storing Fuke's Media content.</li>
                  <li>iPadOS 16+ Reference Mode recommended for auto-setup. Fine Tune Calibration guidance available.</li>
                  <li>Rendering & Reviewing: Documents cover proper video rendering (SDR/HDR formats) and playback (e.g., using Apple Files) on iPad Pros.</li>
                </ul>
              </div>
            </div>
          </ExpansibleTab>

          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-red-600" />
                <span>9-11. Color Management, Remote Grading & Photosensitivity</span>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">9. What is Color Management?</h3>
                <p className="mb-3">Overview of what Fuke's Media means by 'color managed', whether using ACES or not. Aims to improve understanding and standards.</p>
                
                <p className="mb-3"><strong>Definition:</strong> For Fuke's Media, color management goals are:</p>
                <ol className="list-decimal pl-6 space-y-1 mb-3">
                  <li>Predictable/repeatable image viewing and conversion across devices/displays, maintaining creative intent.</li>
                  <li>Color decisions/VFX work done in scene-referred space for flexibility.</li>
                  <li>High-quality, future-proof archival masters.</li>
                </ol>
                
                <p className="mb-3"><strong>Color Pipeline Components:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Input Color Space(s): Based on capture device/source (e.g., SLog3/SGamut3.cine, LogC/WideGamut)</li>
                  <li>Working Color Space: Where image manipulation happens (e.g., camera native logs, ACES)</li>
                  <li>Output Transform: Converts from Working to Display space</li>
                  <li>Display Color Space: What display supports (e.g., Rec.709/BT.1886, PQ P3-D65)</li>
                </ul>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">10. Remote Color Grading and Reviews</h3>
                <p className="mb-3">Guidance on remote look development, grading, review. Outlines scenarios, solutions, risks/benefits.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Monitoring Scenarios:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>HDR Grading/HDR Review: Few options outside professional suites. Colorists need HDR reference monitor for final pass of Dolby Vision titles.</li>
                  <li>HDR Grading/SDR Review: If HDR monitoring not possible for creative, review Dolby Vision-derived SDR version.</li>
                  <li>SDR Grading/SDR Review (for HDR Title): Can progress using SDR monitoring if color managed.</li>
                </ul>
                
                <h4 className="font-semibold mt-3 mb-1">Creative Color Review Methods:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Non-Live Streaming: Asynchronous; colorist renders, uploads for later review. Use session-based watermarking.</li>
                  <li>Live Streaming: Synchronous feed from colorist to creative. Use authentication, encryption, 2FA recommended.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">11. Photosensitivity Prevention Best Practice</h3>
                <p className="mb-3">Guidance on how flashing/strobing affects photosensitive viewers and steps to avoid harmful flashes.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Potential Triggers:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Rapid brightness changes (&gt;3Hz, &gt;25% image - luminance flash)</li>
                  <li>Rapid transitions to/from saturated red (&gt;3Hz - red flash)</li>
                  <li>Flashing/strobing patterns continuing &gt;5s (extended flash)</li>
                  <li>Contrasting, tight patterns, especially if moving rapidly (spatial pattern)</li>
                </ul>
                
                <h4 className="font-semibold mt-3 mb-1">Examples:</h4>
                <p>Strobing/flickering lights, explosions, camera/muzzle flashes, lightning, concerts, reflections, car chases, rapid graphics/titles movement, quick camera moves/edits, contrasting patterns.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Prevention:</h4>
                <p>Address upstream (pre-production, production) for more options without altering intent. Flag potential scenes early (clubs, graphics, storms, sirens, VFX plans).</p>
              </div>
            </div>
          </ExpansibleTab>

          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-red-600" />
                <span>12-15. Pixels, Data Management, Multicam & Non-Approved Cameras</span>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">12. "Dead" Pixels: What Are They and How Do I Avoid or Fix Them?</h3>
                <p className="mb-3"><strong>Definition:</strong> "Misbehaving pixels" (stuck, hot, dead, lit, warm, defective, flashing) deviate from expected response. Can be static or intermittent. Thousands occur on all CMOS sensors due to manufacturing.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Why Not Always Visible:</h4>
                <p>Manufacturers test/map defective pixels and use algorithms (pixel mapping) to correct values during readout by interpolating from neighbors.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Avoidance/Correction:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Warm up camera, perform sensor calibration per manufacturer guidelines.</li>
                  <li>Operate within calibrated temp/exposure ranges; deviations can introduce issues.</li>
                  <li>Use post software pixel masking tools. Some manufacturers (ARRI, RED) provide SDKs for tool integration.</li>
                </ul>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">13. Production Assets: Data Management</h3>
                <p className="mb-3">Redundancy of OCF/OPA is crucial; data loss is costly. Minimum expectations and best practices provided.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Minimum Expectations:</h4>
                <p>Store OCF/OPA securely, reliably, accessibly throughout Production/Post. Use strategies like 3:2:1.</p>
                
                <h4 className="font-semibold mt-3 mb-1">3:2:1 Strategy:</h4>
                <p>At least 3 copies, on 2 different media types, 1 copy offsite.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Best Practices:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Validate subsequent copies against original manifest checksums to ensure chain of custody.</li>
                  <li>Hold enough cards (usually 2 days worth) based on 3:2:1 plan.</li>
                  <li>Perform visual inspection/validation during offload (scrub/spot check).</li>
                </ul>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">14. Best Practices: Multicam Production at Fuke's Media</h3>
                <p className="mb-3">Outlines best practices for Fuke's Media multicam workflows.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Capture:</h4>
                <p>Follows Fuke's Media camera-native workflow: Approved cameras, Log transfer function, native wide gamut, no baked-in looks, RAW preferred.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Monitoring:</h4>
                <p>Use at least one UHD reference monitor on-set for QC. Use LUT boxes/live-grading for non-destructive looks via CDLs/ACES.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Data Management:</h4>
                <p>Can require extra resources vs single-cam due to camera count/turnaround. Refer to Fuke's Media Production Assets: Data Management article.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">15. Non-Approved Cameras - Recommended Settings & Best Practices</h3>
                <p className="mb-3">Use may be necessary; take steps for optimal quality. Consult Fuke's Media Post Manager, test compatibility.</p>
                
                <h4 className="font-semibold mt-3 mb-1">Key Settings:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Resolution: Use highest available. Lower res might crop sensor/alter FOV.</li>
                  <li>Record Format: Use highest quality (RAW or compressed baseband). Choose highest bit-depth, lowest compression available.</li>
                  <li>Color/Transfer Function: Record in camera's native color space/log. Avoid default Rec.709/sRGB for capture.</li>
                </ul>
                
                <h4 className="font-semibold mt-3 mb-1">Common Issues:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>File Naming: May use non-standard or non-configurable naming, leading to overlaps/conform issues.</li>
                  <li>Timecode: Many lack dedicated TC input, complicating sync. Record sound dept TC feed onto audio track if possible.</li>
                  <li>Card Reliability: Consumer media types may fail more often than professional formats.</li>
                </ul>
              </div>
            </div>
          </ExpansibleTab>

          <ExpansibleTab 
            title={
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-red-600" />
                <span>16. On-set Digital Imaging and Data Management: Roles & Responsibilities</span>
              </div>
            }
          >
            <div className="space-y-4">
              <p><strong>Overview:</strong> Defines on-set tasks/responsibilities for image/data pipelines and associated roles, based on industry input, to ensure quality/protection for Fuke's Media productions.</p>
              
              <h4 className="font-semibold mt-3 mb-2">Key Roles:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">DIT (On-Set)</h5>
                  <p>Key role setting up/overseeing image pipeline (set to Post/VFX). Works with DP, ACs, gaffers. SME for color/image pipelines, cameras, capture, metadata, data management.</p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">Data Manager / Digital Loader</h5>
                  <p>Authority on Data Management Plan execution (incl. Visual Inspection) for OCF/sound. On-set or near-set, communicates with Dailies Lab, Editorial, Post.</p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">DIT (Near-Set)</h5>
                  <p>Hybrid DIT/Data Manager role when separation isn't possible. Covers data management + some DIT duties (workflow/camera setup, basic color mgmt, OCF color grading).</p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h5 className="font-medium mb-2">DIT Assistant / Digital Utility / Video Operator</h5>
                  <p>Assists DIT on-set deploying live feed, applying color management, distributing signals. Can help manage RF/transmitters.</p>
                </div>
              </div>
              
              <h4 className="font-semibold mt-4 mb-2">Tasks to Avoid On-set/Near-set:</h4>
              <p>Due to environment/time constraints. If necessary, best managed by dedicated dailies lab personnel.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full Audio/Visual QC: Requires time, controlled environment.</li>
                <li>Archiving (LTO/Content Hub Upload): LTOs fragile, upload needs time, stable high-speed internet, specialized gear.</li>
                <li>OCF Dailies Processing: Requires focus/time beyond speed.</li>
              </ul>
            </div>
          </ExpansibleTab>
        </section>
      </div>
    </div>
  );
};

export default ProductionGuidelines;
