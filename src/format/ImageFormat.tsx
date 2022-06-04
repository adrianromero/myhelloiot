/*
MYHELLOIOT
Copyright (C) 2022 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { IconFormat } from "./FormatTypes";

const GRAY64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV/TalUqDnYQ6ZChOlkQFXHUKhShQqgVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIj14Lgf7+497t4BQr3MNCswDmi6baYScTGTXRWDr+hGAL2IoFtmljEnSUl0HF/38PH1LsazOp/7c/SrOYsBPpF4lhmmTbxBPL1pG5z3icOsKKvE58RjJl2Q+JHrisdvnAsuCzwzbKZT88RhYrHQxkobs6KpEU8RR1VNp3wh47HKeYuzVq6y5j35C0M5fWWZ6zQjSGARS5AgQkEVJZRhI0arToqFFO3HO/iHXb9ELoVcJTByLKACDbLrB/+D391a+ckJLykUB7peHOdjBAjuAo2a43wfO07jBPA/A1d6y1+pAzOfpNdaWvQIGNgGLq5bmrIHXO4AQ0+GbMqu5Kcp5PPA+xl9UxYYvAX61rzemvs4fQDS1FXyBjg4BEYLlL3e4d097b39e6bZ3w/zo3J0YqmHuwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YGBAkdMNqPV/cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12NITEwEAAJKASShWuwRAAAAAElFTkSuQmCC";

type ImageIconFormatParameters = {
  width?: number;
  height?: number;
  mime?: string;
  alt?: string;
  className?: string;
};
export const ImageIconFormat = ({
  width,
  height = 200,
  className,
  alt = "",
  mime = "image/png",
}: ImageIconFormatParameters): IconFormat => ({
  toIcon: (b: Buffer) => {
    const b64 = b.toString("base64");
    const src = "data:" + mime + ";base64," + b64;

    return (
      <div
        className={`myhToIconFormat myhToIconFormat_aligncenter ${className}`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={(ev) => (ev.currentTarget.src = GRAY64)}
        />
      </div>
    );
  },
});
