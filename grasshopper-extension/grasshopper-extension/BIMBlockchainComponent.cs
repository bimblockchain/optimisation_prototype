using System;
using System.Collections.Generic;
using Grasshopper.Kernel;
using Rhino.Geometry;

namespace grasshopper_extension
{
    public class BIMBlockchainComponent : GH_Component
    {
        /// <summary>
        /// Each implementation of GH_Component must provide a public 
        /// constructor without any arguments.
        /// Category represents the Tab in which the component will appear, 
        /// Subcategory the panel. If you use non-existing tab or panel names, 
        /// new tabs/panels will automatically be created.
        /// </summary>
        public BIMBlockchainComponent()
          : base("BIM Blockchain", "BIM",
              "Plugin to transmit data to the Ethereum blockchain (Rinkeby testnet)",
              "Blockchain", "BIM Blockchain")
        {
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            // The list of input parameters required to create the transaction to send to the blockchain
            pManager.AddTextParameter("Password", "Pwb", "Password to unlock the account", GH_ParamAccess.item);
            pManager.AddTextParameter("Address", "Ad", "Address", GH_ParamAccess.item);
            pManager.AddNumberParameter("Optimised Value", "Val", "The result of the optimisation", GH_ParamAccess.item);
        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            // The output is a JSON formatted transaction string, that will be sent to the API for publishing to a blockchain
            pManager.AddTextParameter("Transaction", "Tx", "JSON Formatted transaction string", GH_ParamAccess.item);
        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object can be used to retrieve data from input parameters and 
        /// to store data in output parameters.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        { 
            // Declare the variables for the inputs
            string password = null;
            string address = null;
            double param = double.NaN;

            //If the retrieve fails (because there is no data) then we return
            if (!DA.GetData(0, ref password)) { return; }
            if (!DA.GetData(1, ref address)) { return; }
            if (!DA.GetData(2, ref param)) { return; }

            // Return if the retrieved data is null or empty
            if (string.IsNullOrEmpty(password)) { return; }
            if (string.IsNullOrEmpty(address)) { return; }
            if (double.IsNaN(param)) { return; }

            var blockchainInteractions = new BlockchainInteractions();
            
            // Set the output parameter
            DA.SetData(0, blockchainInteractions.CreateJson(address, password, param));
        }

        /// <summary>
        /// Provides an Icon for every component that will be visible in the User Interface.
        /// Icons need to be 24x24 pixels.
        /// </summary>
        protected override System.Drawing.Bitmap Icon
        {
            get
            {
                // You can add image files to your project resources and access them like this:
                //return Resources.IconForThisComponent;
                return null;
            }
        }

        /// <summary>
        /// Each component must have a unique Guid to identify it. 
        /// It is vital this Guid doesn't change otherwise old ghx files 
        /// that use the old ID will partially fail during loading.
        /// </summary>
        public override Guid ComponentGuid
        {
            get { return new Guid("47f1e3ed-76a1-4e4c-b065-c40eee7b83a4"); }
        }
    }
}
