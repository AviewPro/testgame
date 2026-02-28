const _c = document.getElementById('gc');
const _x = _c.getContext('2d');
const _HM = "저의 두번째 게임 Start to Press Any Button을 즐겨주셔서 감사합니다";
const _sB = new Audio('띠용.mp3'), _sD = new Audio('꺼지는소리.mp3');
const _mB = 0.6;
const _b1 = new Audio('Air 8-bit.mp3'), _b2 = new Audio('Symphony no. 25 8-bit.mp3'), _b3 = new Audio('Winter, The Four Seasons 8-bit.mp3'), _b4 = new Audio('Moonlight Sonata 8-bit.mp3');
[_b1, _b2, _b3, _b4].forEach(a => a.loop = true); _b1.volume = 0.1; _b2.volume = 0.3; _b3.volume = 0.3; _b4.volume = 0.25;
const _iA = new Image(); _iA.src = 'Aview.png';

let _gs = false, _dc = parseInt(localStorage.getItem('deathCount')) || 0, _tc = parseInt(localStorage.getItem('totalClears')) || 0, _hc = localStorage.getItem('hasCleared') === 'true';
let _cs = 1, _tr = false, _pe = false, _f = 0, _ie = false, _sc = false, _he = false, _hy = 0, _id = false, _dt = 0, _ps = [], _md = false, _ds = 1, _s8 = { t: false, b: false };

function _uB() {
    if (_tr && _ie && _f >= 1) return;
    if (_ie || _sc || _he) { if (_b4.paused) { _sa(); _b4.play().catch(e => {}); } }
    else if (_cs >= 7) { if (_b3.paused) { _sa(); _b3.play().catch(e => {}); } }
    else if (_cs >= 5) { if (_b2.paused) { _sa(); _b2.play().catch(e => {}); } }
    else { if (_b1.paused) { _sa(); _b1.play().catch(e => {}); } }
}

function _sa() { [_b1, _b2, _b3, _b4].forEach(a => { a.pause(); a.currentTime = 0; }); }
function _tF() { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(e => {}); }
function _vh(p) { return (_c.height * p) / 100; }

const _bt = {
    w: 0, h: 0, x: 0, y: 0, vx: 0, vy: 0, g: 0, a: 0, va: 0,
    r: function() {
        this.w = _vh(25); this.h = _vh(10); this.x = _c.width / 2 - this.w / 2; this.y = _vh(70);
        this.vx = 0; this.vy = 0; this.a = 0; this.va = 0;
        let gb = _vh(0.05); this.g = (_cs === 1) ? gb * 0.25 : gb;
        _s8 = { t: false, b: false };
    },
    d: function() {
        this.ds(this.x, this.y);
        if (this.x < 0) this.ds(this.x + _c.width, this.y);
        else if (this.x + this.w > _c.width) this.ds(this.x - _c.width, this.y);
    },
    ds: function(px, py) {
        if (_he) return; _x.save(); _x.translate(px + this.w / 2, py + this.h / 2); _x.rotate(this.a);
        if (_md && !_id && !_pe) { let sv = 1 - (_ds * 0.15); _x.scale(sv, sv); }
        if (_id && _dt > 0) _dcR(-this.w / 2, -this.h / 2, this.w, this.h);
        if (!_id && !_ie && !_sc) {
            _x.fillStyle = 'white'; _x.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            _x.strokeStyle = 'black'; _x.lineWidth = _vh(0.5); _x.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
            _x.fillStyle = 'black'; _x.font = `bold ${_vh(4)}px 'Courier New'`; _x.textAlign = 'center'; _x.textBaseline = 'middle'; _x.fillText('START', 0, 0);
        }
        _x.restore();
    }
};

function _dcR(x, y, w, h) {
    _x.strokeStyle = 'black'; _x.lineWidth = 2; _x.beginPath();
    for(let i=0; i<12; i++) {
        _x.moveTo(x + Math.random()*w, y); _x.lineTo(x + Math.random()*w, y + h);
        _x.moveTo(x, y + Math.random()*h); _x.lineTo(x + w, y + Math.random()*h);
    }
    _x.stroke();
}

function _cP(x, y, w, h) {
    for (let i = 0; i < 60; i++) {
        _ps.push({ x: x + w / 2, y: y + h / 2, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40, s: Math.random() * 15 + 5, l: 1.0 });
    }
}

function _tD() {
    if (_id) return; _id = true; _dt = 10; _sD.currentTime = 0; _sD.play();
    _cP(_bt.x, _bt.y, _bt.w, _bt.h); _dc++; localStorage.setItem('deathCount', _dc);
    setTimeout(() => { _cs = 1; _gs = false; _id = false; _ps = []; _bt.r(); document.body.style.backgroundImage = "url('space_back1.gif')"; _uB(); }, 1000);
}

function _gO(tx, ty) {
    const x1 = Math.max(_bt.x, tx), y1 = Math.max(_bt.y, ty), x2 = Math.min(_bt.x + _bt.w, tx + _bt.w), y2 = Math.min(_bt.y + _bt.h, ty + _bt.h);
    const iw = Math.max(0, x2 - x1), ih = Math.max(0, y2 - y1);
    return (iw * ih) / (_bt.w * _bt.h);
}

function _cSC() {
    const th = 0.75; let tx = _c.width / 2 - _bt.w / 2, ty = _vh(30);
    if (_cs === 3 || _cs === 5) { tx = _c.width * 0.1; ty = _vh(10); }
    else if (_cs === 4 || _cs === 6) { tx = _c.width * 0.9 - _bt.w; ty = _vh(90) - _bt.h; }
    if (_cs === 8) {
        if (_gO(_c.width * 0.1, _vh(10)) >= th) _s8.t = true;
        if (_gO(_c.width * 0.9 - _bt.w, _vh(90) - _bt.h) >= th) _s8.b = true;
        if (_s8.t && _s8.b && !_pe) _pC();
    } else { if (_gO(tx, ty) >= th && !_pe) _pC(); }
    function _pC() { _pe = true; setTimeout(() => { if (_cs === 8) _sEN(); else _sNS(); }, 500); }
}

function _sNS() {
    if (_tr) return; _tr = true; _f = 0;
    const fi = setInterval(() => {
        if (_f < 1) { _f += 0.02; } 
        else {
            clearInterval(fi);
            setTimeout(() => {
                _cs++; if (_cs === 7) document.body.style.backgroundImage = "url('space_back4.gif')";
                else if (_cs === 8) document.body.style.backgroundImage = "url('space_back3.gif')";
                _uB(); _gs = false; _pe = false;
                setTimeout(() => { _f = 0; _tr = false; _bt.r(); }, 1000);
            }, 500);
        }
    }, 16);
}

function _sEN() {
    _ie = true; _tr = true; _f = 1; _sa(); _hc = true; 
    _tc++; localStorage.setItem('totalClears', _tc); 
    localStorage.setItem('hasCleared', 'true');
    document.body.style.backgroundImage = "url('space_back2.gif')";
    setTimeout(() => { _b4.play().catch(e => {}); const fi = setInterval(() => { if (_f > 0) _f -= 0.005; else { clearInterval(fi); _tr = false; } }, 16); }, 3000); 
}

function _dOB() {
    if ([2, 5, 6].includes(_cs) && _gs && !_id) {
        const ow = _vh(2), oh = _c.height * 0.46, lx = _c.width * 0.25, rx = _c.width * 0.75, y = (_c.height - oh) / 2, t = Date.now() / 500;
        const _dSB = (bx, by) => {
            _x.fillStyle = '#400000'; _x.fillRect(bx, by, ow, oh); _x.strokeStyle = '#FF3030'; _x.lineWidth = _vh(0.8);
            for (let j = 0; j < 3; j++) { _x.beginPath(); for (let k = 0; k < oh; k += 5) { const sx = bx + (ow / 2) + Math.sin(k / 30 + t + (j * 2)) * (ow / 2.5); if (k === 0) _x.moveTo(sx, by + k); else _x.lineTo(sx, by + k); } _x.stroke(); }
        };
        _dSB(lx, y); _dSB(rx, y);
        if (_bt.x < lx + ow && _bt.x + _bt.w > lx && _bt.y < y + oh && _bt.y + _bt.h > y) _tD();
        if (_bt.x < rx + ow && _bt.x + _bt.w > rx && _bt.y < y + oh && _bt.y + _bt.h > y) _tD();
    }
}

function _dTB() {
    if (!_gs || _tr || _ie || _sc || _he) return; 
    _x.setLineDash([10, 10]); _x.lineWidth = _vh(0.3);
    const _dB = (tx, ty, ic) => { _x.strokeStyle = (ic || _pe) ? 'yellow' : 'white'; _x.strokeRect(tx, ty, _bt.w, _bt.h); };
    if (_cs === 8) { _dB(_c.width * 0.1, _vh(10), _s8.t); _dB(_c.width * 0.9 - _bt.w, _vh(90) - _bt.h, _s8.b); }
    else { let tx = _c.width/2 - _bt.w/2, ty = _vh(30); if (_cs === 3 || _cs === 5) { tx = _c.width*0.1; ty = _vh(10); } else if (_cs === 4 || _cs === 6) { tx = _c.width*0.9 - _bt.w; ty = _vh(90) - _bt.h; } _dB(tx, ty, false); }
    _x.setLineDash([]);
}

function _dHE() {
    if (!_he) return; _x.fillStyle = 'black'; _x.fillRect(0, 0, _c.width, _c.height);
    _x.textAlign = 'center'; _x.fillStyle = 'white'; _x.font = `${_vh(4)}px 'Courier New'`;
    _x.fillText(_HM, _c.width / 2, _c.height - _hy); _hy += 1.2;
    if (_c.height - _hy < -_vh(10)) { _x.fillStyle = 'gray'; _x.font = `${_vh(3)}px 'Courier New'`; _x.fillText('Press Any Button to Return', _c.width / 2, _vh(90)); }
}

/* MEMO: Added 1s cycle pulse animation to Aview image shadow in credits */
function _dUI() {
    if (_he) { _dHE(); return; }
    if (_ie && _f < 1) {
        _x.textAlign = 'center'; _x.fillStyle = 'yellow'; _x.font = `bold ${_vh(6)}px 'Courier New'`; _x.fillText('Congratulations! you make it!', _c.width / 2, _vh(25));
        _x.fillStyle = 'white'; _x.font = `${_vh(5)}px 'Courier New'`; _x.fillText('Press Any Button to Start', _c.width / 2, _vh(50));
        _x.font = `bold ${_vh(12)}px 'Courier New'`; _x.fillText(`Deaths: ${_dc}`, _c.width / 2, _vh(70));
        if (_dc <= 1) { _x.fillStyle = '#FFD700'; _x.fillText('UNBELIEVABLE', _c.width / 2, _vh(85)); }
    } else if (_sc && _f < 1) {
        _x.textAlign = 'center'; _x.fillStyle = 'white'; _x.font = `bold ${_vh(6)}px 'Courier New'`; _x.fillText('ENDING CREDITS', _c.width / 2, _vh(20));
        _x.font = `${_vh(4)}px 'Courier New'`; _x.fillText('Thanks for playing', _c.width / 2, _vh(28));
        _x.font = `${_vh(5)}px 'Courier New'`; _x.fillText('Press Any Button to Start', _c.width / 2, _vh(50));
        _x.fillStyle = 'yellow'; _x.font = `${_vh(4)}px 'Courier New'`; _x.fillText('Made By Aview / Completed By You', _c.width / 2, _vh(58));
        if (_iA.complete) {
            const iw = _vh(45), ih = (_iA.height / _iA.width) * iw, ly = _vh(95) - ih;
            const p = (Math.sin(Date.now() / 318) + 1) / 2; // 1초 주기 진동 (1000ms / PI*2)
            _x.shadowBlur = 5 + (p * 20); _x.shadowColor = "yellow"; 
            _x.drawImage(_iA, _c.width / 2 - iw / 2, ly, iw, ih); _x.shadowBlur = 0;
        }
    } else if (_tr && _f >= 1 && !_ie) {
        _x.fillStyle = 'yellow'; _x.font = `bold ${_vh(7)}px 'Courier New'`; _x.textAlign = 'center'; _x.fillText(`STAGE ${_cs}`, _c.width / 2, _c.height / 2);
    } else if (!_gs && !_id && !_ie && !_sc) {
        _x.fillStyle = 'white'; _x.font = `${_vh(5)}px 'Courier New'`; _x.textAlign = 'center'; _x.fillText('Start to Press Any Button', _c.width / 2, _c.height / 2);
        if (_cs !== 1) { _x.font = `${_vh(3)}px 'Courier New'`; _x.fillText(`- Stage ${_cs} -`, _c.width / 2, _c.height / 2 + _vh(7)); }
        if (_hc && _cs === 1) {
            const bx = _c.width / 2 - _bt.w / 2, by = _bt.y + _vh(12); _x.fillStyle = 'white'; _x.fillRect(bx, by, _bt.w, _bt.h);
            _x.strokeStyle = 'black'; _x.lineWidth = _vh(0.5); _x.strokeRect(bx, by, _bt.w, _bt.h);
            _x.fillStyle = 'black'; _x.font = `bold ${_vh(4)}px 'Courier New'`; _x.textBaseline = 'middle'; _x.fillText('CREDIT', _c.width / 2, by + _bt.h / 2); _x.textBaseline = 'alphabetic';
        }
    }
    if (!_ie && !_sc && !_he) { _x.fillStyle = 'white'; _x.font = `bold ${_vh(3)}px 'Courier New'`; _x.textAlign = 'right'; _x.fillText(`Deaths: ${_dc}`, _c.width - _vh(2), _vh(5)); }
}

function _gL() {
    _x.clearRect(0, 0, _c.width, _c.height); _dTB(); _dOB();
    if (!_id && _gs && !_tr && !_pe && !_ie && !_sc && !_he) {
        _bt.vy += _bt.g; _bt.x += _bt.vx; _bt.y += _bt.vy; _bt.a += _bt.va; _bt.va *= 0.98;
        if (_bt.x + _bt.w < 0) _bt.x += _c.width; else if (_bt.x > _c.width) _bt.x -= _c.width;
        if (_bt.y > _c.height) _tD(); _cSC();
    }
    _ps.forEach((p, i) => { p.x += p.vx; p.y += p.vy; p.l -= 0.02; _x.fillStyle = `rgba(255, 255, 255, ${p.l})`; _x.fillRect(p.x, p.y, p.s, p.s); if (p.l <= 0) _ps.splice(i, 1); });
    if (_dt > 0) _dt--; _bt.d(); _dUI();
    if (_f > 0 && !_he) { _x.fillStyle = `rgba(0, 0, 0, ${_f})`; _x.fillRect(0, 0, _c.width, _c.height); if(_ie || _sc || _tr) _dUI(); }
    requestAnimationFrame(_gL);
}

/* MEMO: Reset death count ONLY when returning from the Ending screen (_ie) */
function _hI(e) {
    if (e.cancelable) e.preventDefault(); 
    _tF(); 
    if (e.type === 'mousedown' || e.type === 'touchstart') _md = true;
    if (e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'touchend') _md = false;
    
    if (_he) { if (e.type === 'mousedown' || e.type === 'keydown' || e.type === 'touchstart') { _he = false; _sc = false; _cs = 1; _gs = false; _dc = 0; localStorage.setItem('deathCount', 0); document.body.style.backgroundImage = "url('space_back1.gif')"; _sa(); _uB(); _bt.r(); } return; }
    
    let cx, cy; const r = _c.getBoundingClientRect();
    if (e.type.startsWith('touch')) { 
        const t = e.touches[0] || e.changedTouches[0];
        cx = t.clientX - r.left; cy = t.clientY - r.top; 
    } else { cx = e.clientX - r.left; cy = e.clientY - r.top; }

    if (!_gs && !_id && !_ie && !_sc) {
        if (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'keydown') {
            if (_hc && _cs === 1 && (e.type !== 'keydown')) { 
                const bx = _c.width / 2 - _bt.w / 2, by = _bt.y + _vh(12); 
                if (cx > bx && cx < bx + _bt.w && cy > by && cy < by + _bt.h) { _sc = true; document.body.style.backgroundImage = "url('space_back2.gif')"; _uB(); return; } 
            }
            _gs = true; _uB();
        } return;
    }
    if ((_ie || _sc) && !_tr) {
        if (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'keydown') {
            if (_sc && _tc >= 2 && _iA.complete && (e.type !== 'keydown')) { 
                const iw = _vh(45), ih = (_iA.height / _iA.width) * iw, lx = _c.width / 2 - iw / 2, ly = _vh(95) - ih; 
                if (cx > lx && cx < lx + iw && cy > ly && cy < ly + ih) { _he = true; _hy = 0; _uB(); return; } 
            }
            
            // 엔딩 화면(_ie)에서 돌아올 때만 데스 카운트 초기화
            if (_ie) { _dc = 0; localStorage.setItem('deathCount', 0); }
            
            _ie = false; _sc = false; _cs = 1; _gs = false; _pe = false; _f = 0; 
            document.body.style.backgroundImage = "url('space_back1.gif')"; _sa(); _uB(); _bt.r();
        } return;
    }
    if (_tr || _id || _pe) return;

    if (e.type === 'mousedown' || e.type === 'touchstart') {
        const bx = _bt.x + _bt.w / 2, by = _bt.y + _bt.h / 2, dx = cx - bx, dy = cy - by, cos = Math.cos(-_bt.a), sin = Math.sin(-_bt.a), rx = dx * cos - dy * sin, ry = dx * sin + dy * cos;
        if (Math.abs(rx) <= _bt.w / 2 && Math.abs(ry) <= _bt.h / 2) {
            const d = Math.sqrt(dx*dx + dy*dy), mD = Math.sqrt(Math.pow(_bt.w/2, 2) + Math.pow(_bt.h/2, 2)); _ds = Math.min(d / mD, 1);
            _sB.currentTime = 0; _sB.volume = 0.1 + (_ds * (_mB - 0.1)); _sB.play();
            let m = (_cs === 1) ? 0.05 : 0.2, b = (_cs === 1) ? _vh(0.3) : _vh(1.2);
            _bt.vx = (bx - cx) * m; _bt.vy = (by - cy) * m - b;
            if (_cs >= 7) _bt.va += (dx / _bt.w) * 0.15;
        }
    }
}

_c.addEventListener('touchstart', _hI, { passive: false });
_c.addEventListener('touchend', _hI, { passive: false });
_c.addEventListener('mousedown', _hI); window.addEventListener('mouseup', _hI); document.addEventListener('keydown', _hI);
window.addEventListener('resize', () => { _c.width = window.innerWidth; _c.height = window.innerHeight; _bt.r(); });
_c.width = window.innerWidth; _c.height = window.innerHeight; _bt.r(); _gL();