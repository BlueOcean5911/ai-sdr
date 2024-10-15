"use client";

import { useEffect, useState } from "react";
import {
  BaseCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import { getUsers } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";
import Select from "@/components/extends/Select/default";
import { useCadence } from "@/contexts/CadenceContext";

export default function Page() {
  const { cadence, setCadence } = useCadence();
  const [userOptions, setUserOptions] = useState<any[]>([]);

  const handleUpdateCadence = (updatedCadence: BaseCadenceModel) => {
    runService(
      { cadenceId: cadence?.id, updatedCadence },
      updateCadence,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    runService(
      cadence.id,
      getCadenceById,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  }, []);

  const fetchUsers = () => {
    runService(
      undefined,
      getUsers,
      (users: any[]) => {
        const tempUserOptions = users.map((user) => {
          return {
            name: user.firstName + " " + user.lastName,
            value: user.id,
          };
        });
        setUserOptions(tempUserOptions);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const handleSaveCadence = () => {
    handleUpdateCadence({
      name: cadence?.name,
      ownerId: cadence?.ownerId,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
          <div className="card flex flex-1 justify-center items-center bg-white">
            <div className="card p-8 max-w-lg min-h-96 w-full flex flex-col gap-5 border shadow-lg">
              <div className="change-password-header">
                <h1 className="text-lg">Account Profile</h1>
                <hr />
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2 border rounded">
                <div className="flex flex-col gap-1">
                  <label className="min-w-24 text-xs" htmlFor="name">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input-primary"
                    value={cadence?.name}
                    onChange={(e) => {
                      setCadence({
                        ...cadence,
                        name: e.target?.value ? e.target?.value : "",
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="min-w-24 text-xs" htmlFor="owner">
                    Owner:
                  </label>
                  <Select
                    data={userOptions}
                    defaultValue={
                      userOptions.filter(
                        (user) => user.value === cadence?.ownerId
                      )[0]
                    }
                  ></Select>
                </div>
                <div className="flex-1" />
                <button
                  className="btn-primary"
                  onClick={() => handleSaveCadence()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
